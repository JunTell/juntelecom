import * as React from "react"
import { cn } from "../lib/utils"

export interface AssetProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  aspectRatio?: "square" | "video" | "auto"
  fit?: "cover" | "contain" | "fill" | "none"
}

const Asset = React.forwardRef<HTMLImageElement, AssetProps>(
  ({ className, aspectRatio = "auto", fit = "cover", style, ...props }, ref) => {
    return (
      <img
        ref={ref}
        className={cn(
          "h-full w-full",
          {
            "aspect-square": aspectRatio === "square",
            "aspect-video": aspectRatio === "video",
            "aspect-auto": aspectRatio === "auto",
            "object-cover": fit === "cover",
            "object-contain": fit === "contain",
            "object-fill": fit === "fill",
            "object-none": fit === "none",
          },
          className
        )}
        style={style}
        {...props}
      />
    )
  }
)
Asset.displayName = "Asset"

export { Asset }
