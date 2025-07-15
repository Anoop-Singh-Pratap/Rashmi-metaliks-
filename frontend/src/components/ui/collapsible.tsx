import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"

/**
 * Collapsible Component
 * 
 * A simple expandable/collapsible content container built on Radix UI's Collapsible primitive
 * that allows users to toggle the visibility of content.
 * 
 * Features:
 * - Simple expanding and collapsing animations
 * - Controlled or uncontrolled usage patterns
 * - Lightweight with minimal DOM elements
 * - Accessible implementation with proper ARIA attributes
 * - Keyboard support for toggling via the trigger element
 * - Support for custom trigger elements
 * - Can be used for FAQ sections, expandable panels, or simple accordions
 * 
 * The Collapsible component provides a more streamlined alternative to the Accordion component
 * when you need a simple expand/collapse behavior without the additional styling and structure
 * of a full accordion. It's ideal for toggling the visibility of a single content section.
 */

const Collapsible = CollapsiblePrimitive.Root

const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger

const CollapsibleContent = CollapsiblePrimitive.CollapsibleContent

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
