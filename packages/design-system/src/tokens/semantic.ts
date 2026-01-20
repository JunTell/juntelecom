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

    secondary: primitive.colors.gray[100],
    secondaryForeground: primitive.colors.gray[900],
    accent: primitive.colors.gray[100],
    accentForeground: primitive.colors.gray[900],
    card: '#ffffff',
    cardForeground: primitive.colors.gray[900],
    popover: '#ffffff',
    popoverForeground: primitive.colors.gray[900],

    primaryHover: primitive.colors.blue[700],
    mutedHover: primitive.colors.gray[200],
    outlineHover: primitive.colors.gray[100],
    ghostHover: primitive.colors.gray[100],
    linkHover: primitive.colors.blue[800],
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

    secondary: primitive.colors.gray[800],
    secondaryForeground: primitive.colors.gray[50],
    accent: primitive.colors.gray[800],
    accentForeground: primitive.colors.gray[50],
    card: primitive.colors.gray[900],
    cardForeground: primitive.colors.gray[50],
    popover: primitive.colors.gray[900],
    popoverForeground: primitive.colors.gray[50],

    primaryHover: primitive.colors.blue[400],
    mutedHover: primitive.colors.gray[700],
    outlineHover: primitive.colors.gray[800],
    ghostHover: primitive.colors.gray[800],
    linkHover: primitive.colors.blue[400],
  },
}