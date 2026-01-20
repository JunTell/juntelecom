import * as React from "react"
import { ListRow, type ListRowProps } from "./ListRow"

export interface NavigateProps extends Omit<ListRowProps, 'withChevron' | 'right'> {
  // Navigate specific props if any
  to?: string // could be used if wrapped with Link from next/link or react-router
}

const Navigate = React.forwardRef<HTMLDivElement, NavigateProps>(
  ({ ...props }, ref) => {
    return (
      <ListRow
        ref={ref}
        withChevron={true}
        {...props}
      />
    )
  }
)
Navigate.displayName = "Navigate"

export { Navigate }
