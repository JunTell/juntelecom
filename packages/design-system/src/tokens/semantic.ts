import { primitive } from "./primitive";

// 보통 테마 전환할때 사용하니 색상은 primitive에 정의된 것들을 사용
export const semantic = {
  light: {
    background: primitive.colors.gray[50],
    foreground: primitive.colors.gray[900],
    primary: primitive.colors.blue[600],
    primaryForeground: '#ffffff',
    muted: primitive.colors.gray[100],
    mutedForeground: primitive.colors.gray[700],
    border: primitive.colors.gray[200],
    success: '#16a34a',
    warning: '#ca8a04',
    error: '#dc2626',
  },
  dark: {
    background: primitive.colors.gray[900],
    foreground: primitive.colors.gray[50],
    primary: primitive.colors.blue[500],
    primaryForeground: '#ffffff',
    muted: primitive.colors.gray[800],
    mutedForeground: primitive.colors.gray[200],
    border: primitive.colors.gray[700],
    success: '#22c55e',
    warning: '#eab308',
    error: '#ef4444',
  },
}