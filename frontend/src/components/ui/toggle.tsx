/**
 * Toggle Component
 * 
 * A two-state button built on Radix UI's Toggle primitive that can be either
 * on or off, providing a simple interaction for binary state changes.
 * 
 * Features:
 * - Multiple visual variants (default, outline)
 * - Multiple size options (sm, default, lg)
 * - Clear visual indication of active/inactive states
 * - Hover and focus states for interactive feedback
 * - Accessible implementation with proper ARIA attributes
 * - Keyboard support for toggling via Space or Enter
 * - Disabled state styling for unavailable options
 * - Consistent styling with the application's button controls
 * 
 * Toggles are useful for binary state controls that need to be more visually prominent
 * than a checkbox but less complex than a switch. They're commonly used for toolbar buttons,
 * view options (grid/list), feature toggles, filter controls, and other UI elements
 * where users can toggle a single feature or mode on and off.
 */
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
