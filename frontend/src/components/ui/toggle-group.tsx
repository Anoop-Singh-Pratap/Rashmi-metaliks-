import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

/**
 * ToggleGroup Component
 * 
 * A set of two-state buttons built on Radix UI's ToggleGroup primitive that allows
 * users to select either a single value or multiple values from a group of options.
 * 
 * Features:
 * - Support for both single-select (radio behavior) and multi-select modes
 * - Consistent styling across all toggle items in the group
 * - Keyboard navigation between options using arrow keys
 * - Visual indication of selected state for each item
 * - Multiple size and variant options inherited from Toggle component
 * - Accessible implementation with proper ARIA attributes
 * - Compact layout with items grouped together visually
 * - Context provider for shared styling properties
 * 
 * ToggleGroups are ideal for compact option selectors like toolbar button groups,
 * view switchers, filter controls, and other interfaces where users need to select
 * from a small set of related options. They provide a more visual alternative to
 * radio groups or checkboxes when the options work well as buttons.
 */

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
