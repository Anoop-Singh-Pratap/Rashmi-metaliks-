/**
 * HoverCard Component
 * 
 * An informational popup component built on Radix UI's HoverCard primitive that displays
 * additional content when users hover over a trigger element.
 * 
 * Features:
 * - Triggered by hover/mouse-over events
 * - Rich content display with support for complex layouts
 * - Configurable positioning around the trigger element
 * - Smooth entrance and exit animations
 * - Customizable delay for opening and closing
 * - Proper handling of rapid mouse movements
 * - Accessible implementation for keyboard users
 * - Consistent styling with other popover elements
 * 
 * HoverCards are ideal for providing additional context without interrupting the user's
 * flow. They're commonly used for user profile previews, term definitions, image previews,
 * metadata displays, and other supplementary information that enhances the main content
 * without requiring a click or navigating away from the current view.
 */
import * as React from "react"
import * as HoverCardPrimitive from "@radix-ui/react-hover-card"

import { cn } from "@/lib/utils"

const HoverCard = HoverCardPrimitive.Root

const HoverCardTrigger = HoverCardPrimitive.Trigger

const HoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <HoverCardPrimitive.Content
    ref={ref}
    align={align}
    sideOffset={sideOffset}
    className={cn(
      "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
HoverCardContent.displayName = HoverCardPrimitive.Content.displayName

export { HoverCard, HoverCardTrigger, HoverCardContent }
