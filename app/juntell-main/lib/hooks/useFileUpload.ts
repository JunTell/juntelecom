import { useState, useRef, useCallback, useEffect } from 'react'

/**
 * 파일 업로드 상태
 */
export interface FileUploadState {
  file: File | null
  uploading: boolean
  progress: number
  fileKey: string | null
  error: string | null
}

/**
 * 파일 업로드 옵션
 */
export interface UseFileUploadOptions {
  /**
   * 허용할 파일 MIME 타입 목록
   */
  allowedTypes?: string[]
  /**
   * 최대 파일 크기 (바이트)
   * @default 10MB
   */
  maxSize?: number
  /**
   * 업로드 완료 콜백
   */
  onUploadComplete?: (fileKey: string) => void
  /**
   * 업로드 에러 콜백
   */
  onUploadError?: (error: string) => void
}

/**
 * 안전한 파일 업로드 훅
 *
 * 보안 기능:
 * - 클라이언트 사이드 rate limiting (1초에 1번)
 * - 파일 타입 검증
 * - 파일 크기 검증
 * - Pre-signed URL 방식 사용 (AWS 자격증명 노출 없음)
 */
export function useFileUpload(options: UseFileUploadOptions = {}) {
  const {
    allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'image/jpeg',
      'image/png',
      'image/webp',
    ],
    maxSize = 10 * 1024 * 1024, // 10MB
    onUploadComplete,
    onUploadError,
  } = options

  const [state, setState] = useState<FileUploadState>({
    file: null,
    uploading: false,
    progress: 0,
    fileKey: null,
    error: null,
  })

  const lastRequestTime = useRef<number>(0)

  /**
   * 파일 선택 핸들러
   */
  const selectFile = useCallback((file: File | null) => {
    if (!file) {
      setState({
        file: null,
        uploading: false,
        progress: 0,
        fileKey: null,
        error: null,
      })
      return
    }

    // 파일 타입 검증
    if (!allowedTypes.includes(file.type)) {
      const error = `허용되지 않는 파일 형식입니다. (${file.type})`
      setState(prev => ({ ...prev, error, file: null }))
      onUploadError?.(error)
      return
    }

    // 파일 크기 검증
    if (file.size > maxSize) {
      const error = `파일 크기가 너무 큽니다. (최대 ${maxSize / 1024 / 1024}MB)`
      setState(prev => ({ ...prev, error, file: null }))
      onUploadError?.(error)
      return
    }

    setState(prev => ({
      ...prev,
      file,
      error: null,
      fileKey: null,
    }))
  }, [allowedTypes, maxSize, onUploadError])

  /**
   * 파일 업로드 실행
   */
  const uploadFile = useCallback(async (fileToUpload?: File) => {
    const targetFile = fileToUpload || state.file

    if (!targetFile) {
      return
    }

    // 클라이언트 사이드 Rate Limiting (1초에 1번)
    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTime.current

    if (timeSinceLastRequest < 1000) {
      const waitTime = Math.ceil((1000 - timeSinceLastRequest) / 1000)
      const error = `요청이 너무 빠릅니다. ${waitTime}초 후에 다시 시도해주세요.`
      setState(prev => ({ ...prev, error }))
      onUploadError?.(error)
      return
    }

    lastRequestTime.current = now

    setState(prev => ({
      ...prev,
      uploading: true,
      progress: 0,
      error: null,
    }))

    try {
      // 1. Pre-signed URL 요청
      setState(prev => ({ ...prev, progress: 10 }))

      const requestBody = {
        fileName: targetFile.name,
        fileType: targetFile.type,
        fileSize: targetFile.size,
      }

      const presignedResponse = await fetch('/api/upload-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      // 응답 JSON은 한 번만 파싱
      const presignedJson = await presignedResponse.json().catch(() => null)

      if (!presignedResponse.ok || !presignedJson) {
        console.error('❌ Pre-signed URL 에러:', presignedJson)
        const message =
          (presignedJson as any)?.error || 'Pre-signed URL 생성 실패'
        throw new Error(message)
      }

      const { uploadUrl, fileKey } = presignedJson as {
        uploadUrl: string
        fileKey: string
      }

      setState(prev => ({ ...prev, progress: 30 }))

      // 2. S3에 파일 업로드
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: targetFile,
        headers: {
          'Content-Type': targetFile.type,
        },
      })

      if (!uploadResponse.ok) {
        const text = await uploadResponse.text().catch(() => '')
        console.error('❌ S3 업로드 실패 status:', uploadResponse.status)
        console.error('❌ S3 응답 바디:', text)
        throw new Error('파일 업로드 실패 (상세는 콘솔 응답 바디 참고)')
      }


      setState(prev => ({
        ...prev,
        progress: 100,
        uploading: false,
        fileKey,
      }))

      onUploadComplete?.(fileKey)
    } catch (error: any) {
      const errorMessage = error.message || '파일 업로드 중 오류가 발생했습니다.'
      console.error('❌ 업로드 에러:', errorMessage, error)
      setState(prev => ({
        ...prev,
        uploading: false,
        progress: 0,
        error: errorMessage,
      }))
      onUploadError?.(errorMessage)
    }
  }, [state.file, onUploadComplete, onUploadError])

  /**
   * 업로드 상태 초기화
   */
  const reset = useCallback(() => {
    setState({
      file: null,
      uploading: false,
      progress: 0,
      fileKey: null,
      error: null,
    })
  }, [])

  return {
    ...state,
    selectFile,
    uploadFile,
    reset,
  }
}
