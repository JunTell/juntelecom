/**
 * Emotion 테마 설정
 *
 * 사용법:
 * import { ThemeProvider } from '@emotion/react'
 * import { theme } from '@/lib/emotion/theme'
 *
 * <ThemeProvider theme={theme}>
 *   <YourComponent />
 * </ThemeProvider>
 */

export const theme = {
  colors: {
    brand: {
      500: '#145ce6',
      600: '#1c7ed6',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.85)',
      secondary: 'rgba(0, 0, 0, 0.60)',
      tertiary: 'rgba(0, 0, 0, 0.45)',
      disabled: 'rgba(0, 0, 0, 0.25)',
      heading: '#222222',
      muted: '#8C8C8C',
      white: '#FFFFFF',
    },
    bg: {
      primary: '#FFFFFF',
      secondary: '#FAFAFA',
      overlayLight: 'rgba(238, 238, 238, 0.2)',
      overlayMedium: 'rgba(238, 238, 238, 0.3)',
      overlayHeavy: 'rgba(238, 238, 238, 0.4)',
      dark: 'rgba(0, 0, 0, 1)',
    },
    border: {
      subtle: 'rgba(0, 0, 0, 0.11)',
      default: 'rgba(0, 0, 0, 0.18)',
      hover: 'rgba(0, 0, 0, 0.45)',
      focus: '#145ce6',
    },
  },
  spacing: {
    1: '4px',
    2: '6px',
    3: '8px',
    4: '12px',
    5: '16px',
    6: '20px',
    7: '24px',
    8: '28px',
    9: '32px',
    10: '40px',
    12: '60px',
    16: '100px',
  },
  fontSize: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '19px',
    xl: '22px',
    '2xl': '23px',
    '3xl': '38px',
  },
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  lineHeight: {
    tight: '1.35em',
    normal: '1.5em',
    relaxed: '1.75em',
  },
  radius: {
    sm: '4px',
    md: '16px',
    lg: '20px',
    xl: '24px',
  },
  shadow: {
    sm: '0px 1px 2px rgba(0, 0, 0, 0.04)',
    md: '0px 5px 12px rgba(0, 0, 0, 0.08)',
    lg: '0px 7px 20px rgba(0, 0, 0, 0.16)',
  },
  transition: {
    base: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

export type Theme = typeof theme
