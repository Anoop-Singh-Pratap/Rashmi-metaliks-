/**
 * Switch Component
 * 
 * A toggle control built on Radix UI's Switch primitive that allows users to
 * turn an option on or off, similar to a physical switch.
 * 
 * Features:
 * - Clear visual indication of current state (on/off)
 * - Smooth transition animations between states
 * - Accessible implementation with proper ARIA attributes
 * - Keyboard navigation support (Tab and Space)
 * - Focus states for keyboard users
 * - Disabled state styling
 * - Touch-friendly target size
 * - Consistent styling with the application's design system
 * 
 * Switches are ideal for binary settings or preferences where immediate effect
 * is desired. Unlike checkboxes which are often used in forms that require submission,
 * switches typically apply changes immediately and are commonly used for enabling/disabling
 * features, toggling modes (light/dark), or controlling visibility of UI elements.
 */
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
