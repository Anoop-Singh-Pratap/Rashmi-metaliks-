/**
 * Input Component
 * 
 * A foundational form control component for text input with consistent styling 
 * and accessibility features.
 * 
 * Features:
 * - Consistent styling with other form controls in the application
 * - Support for all native input types (text, email, password, number, etc.)
 * - Focus states with visual ring indicator for keyboard navigation
 * - Disabled state styling for inactive inputs
 * - Placeholder text support with appropriate styling
 * - File input styling for upload controls
 * - Proper sizing that works well in forms and responsive layouts
 * - Customizable through className prop for specific use cases
 * 
 * This component serves as the primary text input throughout the application,
 * used in search fields, forms, filter controls, and anywhere users need to 
 * enter text or numeric data.
 */
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
