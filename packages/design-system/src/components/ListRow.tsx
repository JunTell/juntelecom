import * as React from "react"
import { cn } from "../lib/utils"

export interface ListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  left?: React.ReactNode
  right?: React.ReactNode
  contents?: React.ReactNode
  subContents?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  withChevron?: boolean
}

const ListRow = React.forwardRef<HTMLDivElement, ListRowProps>(
  ({ className, left, right, contents, subContents, onClick, disabled, withChevron, ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={!disabled ? onClick : undefined}
        className={cn(
          "flex min-h-[56px] w-full items-center justify-between bg-background px-4 py-3 transition-colors",
          onClick && !disabled && "cursor-pointer active:bg-muted/50 hover:bg-muted/30",
          disabled && "opacity-50 pointer-events-none",
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-3 overflow-hidden">
          {left && <div className="flex-shrink-0 text-muted-foreground">{left}</div>}
          <div className="flex flex-col gap-0.5 overflow-hidden">
            {contents && <div className="truncate text-base font-medium text-foreground">{contents}</div>}
            {subContents && <div className="truncate text-sm text-muted-foreground">{subContents}</div>}
          </div>
        </div>

        <div className="flex items-center gap-2 pl-2">
          {right}
          {withChevron && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-muted-foreground/50"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          )}
        </div>
      </div>
    )
  }
)
ListRow.displayName = "ListRow"

export { ListRow }
