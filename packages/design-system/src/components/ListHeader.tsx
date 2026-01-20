import * as React from "react"
import { cn } from "../lib/utils"

export interface ListHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  action?: React.ReactNode
}

const ListHeader = React.forwardRef<HTMLDivElement, ListHeaderProps>(
  ({ className, children, action, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex w-full items-end justify-between px-4 pb-2 pt-6 text-xl font-bold text-foreground",
          className
        )}
        {...props}
      >
        <div>{children}</div>
        {action && <div className="text-sm font-normal">{action}</div>}
      </div>
    )
  }
)
ListHeader.displayName = "ListHeader"

export { ListHeader }
