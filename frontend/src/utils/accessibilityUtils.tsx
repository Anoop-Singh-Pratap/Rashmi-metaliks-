/**
 * Accessibility Utilities
 * 
 * This file contains helper functions to improve accessibility across the application.
 * These utilities can be imported and used in components to ensure better screen reader
 * support, keyboard navigation, and overall accessibility compliance.
 */

import React from 'react';

/**
 * Creates ARIA attributes for elements that should be hidden from screen readers
 * @returns Object with aria-hidden="true" attribute
 */
export const hideFromScreenReader = () => ({
  'aria-hidden': 'true'
});

/**
 * Creates ARIA attributes for elements that should be announced by screen readers
 * but visually hidden on the page
 * @param id Optional ID to reference from other elements
 * @returns Object with role and other appropriate ARIA attributes
 */
export const visuallyHidden = (id?: string) => ({
  className: 'sr-only',
  ...(id ? { id } : {})
});

/**
 * Creates accessible attributes for interactive elements that aren't native buttons
 * @param onClick The click handler function
 * @param label Accessible label for screen readers
 * @returns Object with role, tabIndex, and other appropriate ARIA attributes
 */
export const makeInteractive = (onClick: () => void, label: string) => ({
  role: 'button',
  tabIndex: 0,
  'aria-label': label,
  onClick,
  onKeyDown: (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }
});

/**
 * Creates accessible attributes for elements that describe other elements
 * @param id ID of the element that is being described
 * @returns Object with id attribute for the description element
 */
export const makeDescriptionFor = (id: string) => ({
  id: `${id}-description`,
  'aria-hidden': 'false'
});

/**
 * Creates accessible attributes for elements that need description references
 * @param descriptionId ID of the element that contains the description
 * @returns Object with aria-describedby attribute
 */
export const useDescription = (descriptionId: string) => ({
  'aria-describedby': descriptionId
});

/**
 * Adds skip link functionality for keyboard users
 * @param mainContentId ID of the main content area
 * @returns JSX element for the skip link
 */
export const SkipToContent: React.FC<{ mainContentId?: string }> = ({ 
  mainContentId = 'main-content' 
}) => {
  return (
    <a 
      href={`#${mainContentId}`} 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-white focus:text-black focus:shadow-lg"
    >
      Skip to main content
    </a>
  );
}; 