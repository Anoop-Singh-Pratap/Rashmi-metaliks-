/**
 * Popover Component
 * 
 * A floating content container built on Radix UI's Popover primitive that displays
 * additional content when a trigger element is clicked or activated.
 * 
 * Features:
 * - Contextual display of information or controls related to a trigger element
 * - Flexible positioning (top, bottom, left, right) with automatic alignment
 * - Smooth entrance and exit animations
 * - Focus management for keyboard navigation
 * - Click outside to dismiss behavior
 * - Custom width and styling options
 * - Accessible implementation with proper ARIA attributes
 * - Keyboard support (Escape to dismiss)
 * 
 * Popovers are commonly used for secondary actions, additional information,
 * quick edit forms, feature tours, or contextual help that doesn't require
 * a full modal dialog. Unlike tooltips, popovers are interactive and typically
 * triggered by clicks rather than hover events.
 */
import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
