/**
 * Textarea Component
 * 
 * A multi-line text input component for collecting longer form text input
 * with consistent styling and accessibility features.
 * 
 * Features:
 * - Resizable input area for varying amounts of text
 * - Minimum height setting to prevent too-small textareas
 * - Focus states with visual ring indicator for keyboard navigation
 * - Scrollable content for overflow text
 * - Placeholder text support with appropriate styling
 * - Disabled state styling for inactive textareas
 * - Full width by default with customizable dimensions
 * - Consistent styling with other form controls in the application
 * 
 * Textareas are used throughout the application for comment fields, message composition,
 * bio/description inputs, feedback forms, and any other use case where users need
 * to enter multiple lines of text or longer content that wouldn't fit comfortably
 * in a standard single-line input.
 */
import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
