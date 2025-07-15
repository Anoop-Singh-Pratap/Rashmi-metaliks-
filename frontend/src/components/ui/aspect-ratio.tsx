/**
 * AspectRatio Component
 * 
 * A layout component built on Radix UI's AspectRatio primitive that maintains
 * a consistent width-to-height ratio for its content.
 * 
 * Features:
 * - Maintains consistent proportions regardless of container width
 * - Prevents layout shifts during content loading
 * - Supports any standard aspect ratio (16/9, 4/3, 1/1, etc.)
 * - Perfect for responsive media like images and videos
 * - Helps prevent cumulative layout shift (CLS) for better performance metrics
 * - Simple implementation with minimal DOM elements
 * - Works reliably across different viewport sizes
 * 
 * AspectRatio is used throughout the application for media containers, card images,
 * video embeds, maps, charts, and other content that needs to maintain specific
 * proportions while still being responsive to the container width.
 */
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

const AspectRatio = AspectRatioPrimitive.Root

export { AspectRatio }
