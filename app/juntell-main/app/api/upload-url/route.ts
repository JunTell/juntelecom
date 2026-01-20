import { NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { checkRateLimit } from '@/lib/utils/rateLimiter'
import { getClientIp } from '@/lib/utils/getClientIp'
import crypto from 'crypto'

/**
 * 허용된 파일 MIME 타입
 * 이력서/포트폴리오 파일만 허용
 */
const ALLOWED_FILE_TYPES = [
  // PDF
  'application/pdf',
  // Word 문서
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  // 이미지 (포트폴리오용)
  'image/jpeg',
  'image/png',
  'image/webp',
] as const

/**
 * 파일 크기 제한: 10MB
 */
const MAX_FILE_SIZE = 10 * 1024 * 1024

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
 * 안전한 파일명 생성
 * 원본 파일명의 확장자를 유지하면서 UUID를 사용합니다.
 */
function generateSafeFileName(originalFileName: string): string {
  const extension = originalFileName.split('.').pop()?.toLowerCase() || ''
  const uuid = crypto.randomUUID()
  const timestamp = Date.now()

  // applications/YYYY-MM-DD/UUID_timestamp.ext 형식
  const date = new Date().toISOString().split('T')[0]
  return `applications/${date}/${uuid}_${timestamp}.${extension}`
}

/**
 * 파일 타입 검증
 */
function isAllowedFileType(contentType: string): boolean {
  return ALLOWED_FILE_TYPES.includes(contentType as any)
}

/**
 * POST /api/upload-url
 * Pre-signed URL 생성 API
 *
 * 보안 기능:
 * - Rate Limiting: 1초에 1번
 * - 파일 타입 검증
 * - 파일 크기 제한
 * - 안전한 파일명 생성
 */
export async function POST(request: Request) {
  try {
    // 1. Rate Limiting 검사 (1초에 1번)
    const clientIp = getClientIp(request)
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

    // 2. 요청 본문 파싱
    const body = await request.json()
    const { fileName, fileType, fileSize } = body

    // 3. 필수 필드 검증
    if (!fileName || !fileType || !fileSize) {
      return NextResponse.json(
        { error: '파일 정보가 누락되었습니다.' },
        { status: 400 }
      )
    }

    // 4. 파일 타입 검증
    if (!isAllowedFileType(fileType)) {
      return NextResponse.json(
        {
          error: '허용되지 않는 파일 형식입니다.',
          allowedTypes: ALLOWED_FILE_TYPES,
        },
        { status: 400 }
      )
    }

    // 5. 파일 크기 검증
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: `파일 크기가 너무 큽니다. 최대 ${MAX_FILE_SIZE / 1024 / 1024}MB까지 허용됩니다.`,
          maxSize: MAX_FILE_SIZE,
        },
        { status: 400 }
      )
    }

    // 6. 안전한 파일명 생성
    const safeFileName = generateSafeFileName(fileName)

    // 7. S3 클라이언트 초기화
    const s3Client = getS3Client()

    // 8. Pre-signed URL 생성
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: safeFileName,
      ContentType: fileType,
      ContentLength: fileSize,
    })

    const presignedUrl = await getSignedUrl(s3Client, command, {
      expiresIn: PRESIGNED_URL_EXPIRY,
    })

    // 9. 성공 응답
    return NextResponse.json({
      uploadUrl: presignedUrl,
      fileKey: safeFileName,
      expiresIn: PRESIGNED_URL_EXPIRY,
    })
  } catch (error: any) {
    console.error('Pre-signed URL 생성 오류:', error)

    return NextResponse.json(
      {
        error: 'Pre-signed URL 생성에 실패했습니다.',
        details: error.message || String(error),
      },
      { status: 500 }
    )
  }
}
