/**
 * Progress Component
 * 
 * A visual indicator built on Radix UI's Progress primitive that displays the
 * completion status of a task or process.
 * 
 * Features:
 * - Smooth animation for value changes
 * - Accessible implementation with proper ARIA attributes
 * - Clear visual representation of progress percentage
 * - Customizable height and styling
 * - Consistent color scheme with the application's design system
 * - Rounded ends for a polished appearance
 * - Supports indeterminate state for unknown progress
 * - Responsive width that adapts to container size
 * 
 * Progress bars are used throughout the application to provide feedback for processes
 * like file uploads, form completion, multi-step workflows, loading states, and other
 * operations where it's helpful to indicate how much of a task has been completed and
 * how much remains.
 */
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
