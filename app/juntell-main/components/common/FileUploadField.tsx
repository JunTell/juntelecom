import { ReactNode } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import { FormField } from './FormField';

interface FileUploadFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string | ReactNode;
  placeholder?: string;
  accept?: string;
  error?: string;
  rules?: any;
}

export const FileUploadField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder = '파일 첨부',
  accept,
  error,
  rules
}: FileUploadFieldProps<T>) => {
  return (
    <FormField
      name={name}
      control={control}
      label={label}
      rules={rules}
      render={(field) => (
        <div className="relative">
          <input
            type="file"
            id={name}
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              field.onChange(file);
            }}
            accept={accept}
            className="hidden"
          />
          <label
            htmlFor={name}
            className={`w-full px-4 py-3 border rounded-lg flex items-center justify-between cursor-pointer hover:border-label-500 transition-colors bg-white ${
              error ? 'border-status-error' : 'border-line-400'
            }`}
          >
            <span className="text-body-3 text-label-500">
              {field.value ? (field.value as File).name : placeholder}
            </span>
            <svg
              className="w-5 h-5 text-label-500 shrink-0 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </label>
        </div>
      )}
      error={error}
    />
  );
};
