import { format, formatDistanceToNow } from 'date-fns'
import { ko } from 'date-fns/locale'

/**
 * 날짜를 포맷팅하는 유틸리티 함수
 */
export function formatDate(date: string | Date, formatStr: string = 'yyyy.MM.dd') {
  return format(new Date(date), formatStr, { locale: ko })
}

/**
 * 상대적인 시간을 표시하는 함수 (예: "3일 전")
 */
export function formatRelativeTime(date: string | Date) {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: ko })
}

/**
 * 날짜가 유효한지 확인하는 함수
 */
export function isValidDate(date: string | Date): boolean {
  const d = new Date(date)
  return d instanceof Date && !isNaN(d.getTime())
}

/**
 * 날짜 범위를 체크하는 함수
 */
export function isDateInRange(
  date: string | Date,
  startDate: string | Date,
  endDate: string | Date
): boolean {
  const d = new Date(date)
  const start = new Date(startDate)
  const end = new Date(endDate)
  return d >= start && d <= end
}
