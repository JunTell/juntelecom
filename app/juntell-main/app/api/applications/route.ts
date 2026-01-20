import { NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'
import { checkRateLimit } from '@/lib/utils/rateLimiter'
import { getClientIp } from '@/lib/utils/getClientIp'

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

    // Service Role을 사용하여 RLS를 우회 (지원서 제출은 익명 사용자도 가능해야 함)
    const supabase = createServiceClient()

    // JSON 파싱
    const body = await request.json()

    const {
      jobId,
      department,
      name,
      phone,
      email,
      birthDate,
      referrer,
      privacyOptional,
      resumeUrl,
    } = body

    // 필수 필드 검증
    if (!jobId || !name || !phone || !email || !birthDate) {
      return NextResponse.json(
        { error: '필수 정보를 모두 입력해주세요.' },
        { status: 400 }
      )
    }

    // 생년월일을 정수로 변환 (YYYYMMDD -> int)
    const birthdayInt = parseInt(birthDate, 10)

    // 지원서 정보를 데이터베이스에 저장
    const { data, error: insertError } = await supabase
      .from('applications')
      .insert([
        {
          job_id: jobId,
          department: department || null,
          name,
          phone,
          email,
          birthday: birthdayInt,
          referrer: referrer || null,
          privacy_optional: privacyOptional || false,
          resume_url: resumeUrl || null,
          status: 'pending',
        },
      ])
      .select()

    if (insertError) {
      console.error('Insert error:', insertError)
      return NextResponse.json(
        {
          error: '지원서 저장에 실패했습니다.',
          details: insertError.message,
          code: insertError.code
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: '지원서가 성공적으로 제출되었습니다.',
        data,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Application submission error:', error)
    return NextResponse.json(
      {
        error: '지원서 제출 중 오류가 발생했습니다.',
        details: error.message || String(error)
      },
      { status: 500 }
    )
  }
}
