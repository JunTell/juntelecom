import { NextRequest, NextResponse } from 'next/server'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { checkRateLimit } from '@/lib/utils/rateLimiter'
import { getClientIp } from '@/lib/utils/getClientIp'

/**
 * Pre-signed URL 유효 시간: 5분
 */
const PRESIGNED_URL_EXPIRY = 5 * 60

/**
 * S3 클라이언트 초기화 (서버 사이드 전용)
 */
function getS3Client() {
  if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error('AWS 환경 변수가 설정되지 않았습니다.')
  }

  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  })
}

/**
 * GET /api/file-url?key=...
 * 파일 다운로드용 Pre-signed URL 생성 API
 *
 * 보안 기능:
 * - Rate Limiting: 1초에 1번
 * - key 형식 검증 (경로 조작 방지)
 *
 * TODO: 권한 검증 추가 필요
 * - 관리자만 접근 가능하도록 인증 추가
 * - 또는 applications 테이블에서 해당 key가 존재하는지 확인
 */
export async function GET(req: NextRequest) {
  try {
    // 1. Rate Limiting 검사 (1초에 1번)
    const clientIp = getClientIp(req)
    const rateLimitResult = checkRateLimit(clientIp, {
      maxRequests: 1,
      windowMs: 1000, // 1초
    })

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        {
          error: '요청이 너무 빠릅니다. 잠시 후 다시 시도해주세요.',
          retryAfter: rateLimitResult.retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter),
          },
        }
      )
    }

    // 2. key 파라미터 추출
    const { searchParams } = new URL(req.url)
    const key = searchParams.get('key')

    if (!key) {
      return NextResponse.json(
        { error: 'key 쿼리 파라미터가 필요합니다.' },
        { status: 400 }
      )
    }

    // 3. key 형식 검증 (경로 조작 방지)
    // applications/로 시작하는지 확인
    if (!key.startsWith('applications/')) {
      return NextResponse.json(
        { error: '유효하지 않은 파일 경로입니다.' },
        { status: 400 }
      )
    }

    // 상위 경로 참조 방지 (../ 포함 여부 확인)
    if (key.includes('../') || key.includes('..\\')) {
      return NextResponse.json(
        { error: '유효하지 않은 파일 경로입니다.' },
        { status: 400 }
      )
    }

    // TODO: 권한 검증
    // - 관리자 인증 확인
    // - 또는 applications 테이블에서 해당 key 존재 여부 확인

    // 4. S3 클라이언트 초기화
    const s3Client = getS3Client()

    // 5. Pre-signed URL 생성 (다운로드용)
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: key,
    })

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: PRESIGNED_URL_EXPIRY,
    })

    // 6. 성공 응답
    return NextResponse.json({
      url,
      expiresIn: PRESIGNED_URL_EXPIRY,
    })
  } catch (error: any) {
    console.error('파일 URL 생성 오류:', error)

    return NextResponse.json(
      {
        error: '파일 URL 생성에 실패했습니다.',
        details: error.message || String(error),
      },
      { status: 500 }
    )
  }
}
