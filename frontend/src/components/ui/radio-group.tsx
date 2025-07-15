import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * RadioGroup Component
 * 
 * A set of checkable buttons built on Radix UI's RadioGroup primitive that allows
 * users to select a single option from a list of mutually exclusive choices.
 * 
 * Features:
 * - Semantic grouping of related radio options
 * - Visual indication of selected state with inner circle
 * - Keyboard navigation between options using arrow keys
 * - Accessible implementation with proper ARIA attributes
 * - Focus states for keyboard users
 * - Disabled state styling for unavailable options
 * - Proper label association for each option
 * - Consistent styling with the application's form controls
 * 
 * RadioGroups are ideal for selection scenarios where only one choice is valid
 * from a set of options. They're commonly used in forms for exclusive selections
 * like gender, subscription plans, shipping methods, survey responses, and other
 * scenarios where users must choose exactly one item from a list of alternatives.
 */
const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Circle className="h-2.5 w-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
