'use client'

import { useRef } from 'react'
import { useFileUpload } from '@/lib/hooks/useFileUpload'

export interface FileUploadProps {
  /**
   * 파일 업로드 완료 시 fileKey를 전달받는 콜백
   */
  onFileKeyChange: (fileKey: string | null) => void
  /**
   * 레이블 텍스트
   */
  label?: string
  /**
   * 필수 여부
   */
  required?: boolean
  /**
   * 설명 텍스트
   */
  description?: string
}

/**
 * 안전한 파일 업로드 컴포넌트
 *
 * 보안 기능:
 * - 클라이언트 사이드 rate limiting
 * - 파일 타입 검증
 * - 파일 크기 제한
 * - Pre-signed URL 방식으로 안전한 업로드
 */
export function FileUpload({
  onFileKeyChange,
  label = '이력서 또는 포트폴리오',
  required = false,
  description = 'PDF, Word, 이미지 파일만 업로드 가능합니다. (최대 10MB)',
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const {
    file,
    uploading,
    progress,
    fileKey,
    error,
    selectFile,
    uploadFile,
    reset,
  } = useFileUpload({
    onUploadComplete: (key) => {
      onFileKeyChange(key)
    },
    onUploadError: (errorMessage) => {
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null
    selectFile(selectedFile)

    // 파일이 선택되면 자동으로 업로드 시작
    if (selectedFile) {
      // 파일을 직접 전달하여 state 동기화 문제 해결
      uploadFile(selectedFile)
    } else {
      onFileKeyChange(null)
    }
  }

  const handleRemoveFile = () => {
    reset()
    onFileKeyChange(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <label className="block text-body-2 font-semibold text-label-900">
        {label}
        {required && <span className="text-status-error ml-1">•</span>}
      </label>
      {description && (
        <p className="text-caption-1 text-label-600">{description}</p>
      )}

      {/* 파일 입력 (숨김) */}
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
        className="hidden"
        disabled={uploading}
      />

      {/* 파일 선택 버튼 또는 업로드 상태 */}
      {!file && !fileKey && !uploading && (
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full px-4 py-3 border-2 border-dashed border-line-400 rounded-lg hover:border-primary transition-colors text-body-3 text-label-600 hover:text-primary"
        >
          + 파일 선택
        </button>
      )}

      {/* 에러 발생 시 다시 선택 버튼 */}
      {error && !uploading && !fileKey && (
        <button
          type="button"
          onClick={handleButtonClick}
          className="w-full px-4 py-3 border-2 border-dashed border-status-error rounded-lg hover:border-status-error/80 transition-colors text-body-3 text-status-error"
        >
          + 파일 다시 선택
        </button>
      )}

      {/* 업로드 중 */}
      {uploading && file && (
        <div className="w-full p-4 border border-line-400 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-body-3 text-label-900 truncate flex-1 mr-4">
              {file.name}
            </span>
            <span className="text-caption-1 text-label-600">{progress}%</span>
          </div>
          <div className="w-full bg-line-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* 업로드 완료 */}
      {fileKey && !uploading && (
        <div className="w-full p-4 border border-status-success bg-status-success/5 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1 min-w-0">
              <svg
                className="w-5 h-5 text-status-success shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="ml-3 text-body-3 text-label-900 truncate">
                {file?.name || '파일 업로드 완료'}
              </span>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="ml-4 text-caption-1 text-status-error hover:text-status-error/80 shrink-0"
            >
              삭제
            </button>
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && (
        <p className="text-caption-1 text-status-error mt-1">{error}</p>
      )}
    </div>
  )
}
