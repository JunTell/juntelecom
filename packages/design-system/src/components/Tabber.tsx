import * as React from "react"
import { cn } from "../lib/utils"

export interface TabberProps extends React.HTMLAttributes<HTMLDivElement> {
  // props
}

const Tabber = React.forwardRef<HTMLDivElement, TabberProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50 flex h-16 w-full items-center justify-around border-t bg-background px-2 pb-safe",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Tabber.displayName = "Tabber"

const TabberItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean
    icon?: React.ReactNode
    label?: string
  }
>(({ className, active, icon, label, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "flex flex-1 flex-col items-center justify-center gap-1 text-[10px] font-medium transition-colors",
        active ? "text-primary" : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {icon && <div className="h-6 w-6">{icon}</div>}
      {label && <span>{label}</span>}
    </button>
  )
})
TabberItem.displayName = "TabberItem"

export { Tabber, TabberItem }
