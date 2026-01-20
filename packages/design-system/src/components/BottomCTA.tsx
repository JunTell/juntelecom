import * as React from "react"
import { cn } from "../lib/utils"

export interface BottomCTAProps extends React.HTMLAttributes<HTMLDivElement> {
  fixed?: boolean
}

const BottomCTA = React.forwardRef<HTMLDivElement, BottomCTAProps>(
  ({ className, children, fixed = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "w-full bg-background p-4 border-t",
          fixed && "fixed bottom-0 left-0 right-0 z-50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
BottomCTA.displayName = "BottomCTA"

export { BottomCTA }
