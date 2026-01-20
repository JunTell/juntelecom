import * as React from "react"
import { cn } from "../lib/utils"

export interface TopProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode
  center?: React.ReactNode
  right?: React.ReactNode
  sticky?: boolean
  glass?: boolean
}

const Top = React.forwardRef<HTMLDivElement, TopProps>(
  ({ className, left, center, right, sticky = true, glass = true, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={cn(
          "flex h-14 w-full items-center justify-between border-b px-4 transition-all z-50",
          sticky && "sticky top-0",
          glass && "bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60",
          !glass && "bg-background",
          className
        )}
        {...props}
      >
        <div className="flex w-12 items-center justify-start">{left}</div>
        <div className="flex flex-1 items-center justify-center text-center font-semibold text-lg">
          {center}
        </div>
        <div className="flex w-12 items-center justify-end">{right}</div>
      </header>
    )
  }
)
Top.displayName = "Top"

export { Top }
