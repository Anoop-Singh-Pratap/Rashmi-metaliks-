/**
 * Separator Component
 * 
 * A visually and semantically separated horizontal or vertical line built on Radix UI's
 * Separator primitive that divides content areas or list items.
 * 
 * Features:
 * - Support for both horizontal and vertical orientations
 * - Consistent styling with theme-based border colors
 * - Configurable as decorative or semantic (for screen readers)
 * - Minimal and clean design that integrates with other UI components
 * - Accessible implementation with proper ARIA attributes when used semantically
 * - Responsive width/height based on parent container
 * 
 * Separators are essential for creating visual hierarchy and organization in interfaces.
 * They help users distinguish between different sections or items, improving readability
 * and content grouping. Common uses include dividing navigation items, separating form sections,
 * creating space between list items, or distinguishing header/footer areas from main content.
 */
import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(
  (
    { className, orientation = "horizontal", decorative = true, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
