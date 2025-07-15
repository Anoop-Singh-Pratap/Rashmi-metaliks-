/**
 * Badge Component
 * 
 * A small, versatile label component used to highlight status, category, 
 * or other metadata throughout the application.
 * 
 * Features:
 * - Multiple visual variants (default, secondary, destructive, outline)
 * - Consistent rounded pill shape for easy recognition
 * - Appropriate size and padding for use inline with text or as standalone elements
 * - Hover states for interactive badges
 * - Focus styles for keyboard navigation
 * - Customizable through className prop for specific use cases
 * - Accessible text contrast ratios for all variants
 * 
 * This component is used to display status indicators, categories, counts,
 * tags, and other short pieces of metadata that need visual distinction
 * from surrounding content.
 */
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
