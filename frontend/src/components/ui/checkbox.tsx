/**
 * Checkbox Component
 * 
 * An accessible checkbox component built on Radix UI's Checkbox primitive that
 * provides consistent styling and behavior for binary selection controls.
 * 
 * Features:
 * - Accessible keyboard interactions and screen reader support
 * - Visual check mark indicator when checked
 * - Support for indeterminate state for partial selections
 * - Focus states with visual ring indicator for keyboard navigation
 * - Disabled state styling for inactive checkboxes
 * - Consistent sizing and spacing with other form controls
 * - Proper ARIA attributes for accessibility
 * - Integration with form libraries through standard onChange handlers
 * 
 * This component is used throughout the application for boolean selections,
 * multiple-choice lists, terms acceptance, configuration options, and other
 * interfaces where users need to make binary or multiple selections.
 */
import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
