/**
 * Rate Limiter 유틸리티
 * IP 주소 기반으로 요청 속도를 제한합니다.
 */

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

/**
 * Rate Limiter 설정
 */
export interface RateLimiterConfig {
  /**
   * 허용할 최대 요청 수
   */
  maxRequests: number
  /**
   * 시간 윈도우 (밀리초)
   * @default 1000 (1초)
   */
  windowMs: number
}

/**
 * IP 주소 기반 Rate Limiting 검사
 * @param identifier - 고유 식별자 (보통 IP 주소)
 * @param config - Rate Limiter 설정
 * @returns 요청 허용 여부 및 재시도 가능 시간
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimiterConfig = { maxRequests: 1, windowMs: 1000 }
): { allowed: boolean; retryAfter?: number } {
  const now = Date.now()
  const record = store[identifier]

  // 기록이 없거나 시간 윈도우가 지난 경우
  if (!record || now > record.resetTime) {
    store[identifier] = {
      count: 1,
      resetTime: now + config.windowMs,
    }
    return { allowed: true }
  }

  // 요청 횟수가 제한을 초과한 경우
  if (record.count >= config.maxRequests) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000)
    return { allowed: false, retryAfter }
  }

  // 요청 횟수 증가
  record.count++
  return { allowed: true }
}

/**
 * 특정 식별자의 rate limit 기록 초기화
 * @param identifier - 고유 식별자
 */
export function resetRateLimit(identifier: string): void {
  delete store[identifier]
}

/**
 * 만료된 기록들을 정리 (메모리 관리)
 * 주기적으로 호출하는 것을 권장
 */
export function cleanupExpiredRecords(): void {
  const now = Date.now()
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key]
    }
  })
}

// 5분마다 만료된 기록 정리
if (typeof window === 'undefined') {
  setInterval(cleanupExpiredRecords, 5 * 60 * 1000)
}
