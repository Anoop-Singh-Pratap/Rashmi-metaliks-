/**
 * Skeleton Component
 * 
 * A placeholder loading state component that mimics the shape and structure of content
 * before it has loaded, reducing perceived loading time and layout shifts.
 * 
 * Features:
 * - Subtle pulsing animation to indicate loading state
 * - Customizable dimensions to match various content types
 * - Rounded corners for a polished appearance
 * - Theme-aware styling that matches the application's design system
 * - Lightweight implementation with minimal DOM elements
 * - Can be composed to create complex loading state layouts
 * 
 * Skeletons improve the user experience during data fetching or processing by providing
 * visual feedback about the expected content structure. They're commonly used for lists,
 * cards, text blocks, images, and other content areas that might take time to load.
 * Unlike spinners, skeletons give users a preview of the layout, reducing cognitive load
 * and perceived waiting time.
 */
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
