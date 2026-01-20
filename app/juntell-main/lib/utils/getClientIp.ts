/**
 * Next.js Request에서 클라이언트 IP 주소를 추출합니다.
 * 프록시, 로드 밸런서를 고려하여 실제 클라이언트 IP를 가져옵니다.
 */
export function getClientIp(request: Request): string {
  // Headers에서 IP 주소 추출 시도
  const forwarded = request.headers.get('x-forwarded-for')
  const realIp = request.headers.get('x-real-ip')
  const cfConnectingIp = request.headers.get('cf-connecting-ip') // Cloudflare

  if (forwarded) {
    // x-forwarded-for는 여러 IP가 쉼표로 구분될 수 있음 (첫 번째가 실제 클라이언트)
    return forwarded.split(',')[0].trim()
  }

  if (realIp) {
    return realIp.trim()
  }

  if (cfConnectingIp) {
    return cfConnectingIp.trim()
  }

  // 기본값: unknown
  return 'unknown'
}
