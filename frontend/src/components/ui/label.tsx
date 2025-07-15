/**
 * Label Component
 * 
 * An accessible form label component built on Radix UI's Label primitive that
 * provides consistent styling and proper associations with form controls.
 * 
 * Features:
 * - Semantic HTML label element with proper accessibility support
 * - Automatic association with form controls through the htmlFor attribute
 * - Consistent styling with the application's typography system
 * - Support for disabled states when used with disabled form controls
 * - Appropriate cursor styles for interactive elements
 * - Proper text size and weight for form field labels
 * - Customizable through className prop for specific use cases
 * 
 * This component is used throughout the application's forms to provide clear,
 * accessible labels for inputs, selects, checkboxes, radio buttons, and other
 * form controls, ensuring both visual clarity and screen reader compatibility.
 */
import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
