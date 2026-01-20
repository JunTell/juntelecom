import '@emotion/react'
import type { Theme as MyTheme } from '@/lib/emotion/theme'

declare module '@emotion/react' {
  export interface Theme extends MyTheme { }
}
