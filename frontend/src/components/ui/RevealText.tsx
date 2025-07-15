/**
 * RevealText Component
 * 
 * This component creates elegant text reveal animations when the element enters the viewport.
 * It splits the text into individual words and animates them with a staggered entrance effect.
 * 
 * Features:
 * - Uses IntersectionObserver for performant viewport detection
 * - Staggered reveal animation for each word in the text
 * - Configurable animation delays (stagger and initial delays)
 * - Supports rendering as different HTML elements (h1-h6, p, span)
 * - Option to trigger animation once or every time the element enters viewport
 * - Custom class names support for additional styling
 * - Supports HTML markup inside the text with pattern recognition
 * 
 * This component is ideal for headings, titles, and important text that should
 * grab the user's attention when scrolled into view.
 */


import React, { useEffect, useRef, useState } from 'react';

interface RevealTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  once?: boolean;
  dangerousHTML?: boolean;
}

const RevealText: React.FC<RevealTextProps> = ({
  text,
  as = 'p',
  staggerDelay = 0.05,
  initialDelay = 0,
  className = '',
  once = true,
  dangerousHTML = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [once]);

  const Component = as;
  
  // Handle text with special patterns like "<span className="text-rashmi-red">Text</span>"
  const processTextWithPatterns = () => {
    // Match pattern: text <span className="text-rashmi-red">Red Text</span> more text
    const redTextPattern = /<span className="text-rashmi-red">(.*?)<\/span>/g;
    
    // Split the text by the pattern to get parts before, inside, and after the red text
    const parts = text.split(redTextPattern);
    const matches = text.match(redTextPattern) || [];
    
    // Extract the content from the spans
    const redTexts = matches.map(match => {
      const content = match.match(/<span className="text-rashmi-red">(.*?)<\/span>/);
      return content ? content[1] : '';
    });
    
    // Reconstruct text parts and red text parts in order
    const combinedParts: {text: string; isRed: boolean}[] = [];
    
    parts.forEach((part, index) => {
      if (part.trim()) {
        combinedParts.push({ text: part, isRed: false });
      }
      if (index < redTexts.length) {
        combinedParts.push({ text: redTexts[index], isRed: true });
      }
    });
    
    // Filter out empty parts
    return combinedParts.filter(part => part.text.trim().length > 0);
  };
  
  // Check if text contains the special red text pattern
  const containsRedTextPattern = /<span className="text-rashmi-red">(.*?)<\/span>/g.test(text);
  
  if (dangerousHTML && containsRedTextPattern) {
    const textParts = processTextWithPatterns();
    const allWords: { word: string; isRed: boolean; index: number }[] = [];
    
    // Process all parts into individual words with their properties
    textParts.forEach((part, partIndex) => {
      const words = part.text.trim().split(' ');
      words.forEach((word, wordIndex) => {
        if (word) {
          allWords.push({ 
            word, 
            isRed: part.isRed,
            index: allWords.length
          });
        }
      });
      
      // Add a space between parts if this isn't the last part
      if (partIndex < textParts.length - 1 && !part.text.endsWith(' ') && !textParts[partIndex + 1].text.startsWith(' ')) {
        // Don't add space after the last word of a part
      }
    });
    
    return (
      <div ref={containerRef} className="overflow-hidden">
        <Component className={className}>
          {allWords.map(({ word, isRed, index }) => (
            <span key={index} className="inline-block mr-2">
              <span
                className="inline-block overflow-hidden"
                style={{
                  transitionDelay: `${initialDelay + index * staggerDelay}s`,
                }}
              >
                <span
                  className={`inline-block transition-transform duration-700 ease-out ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                  } ${isRed ? 'text-rashmi-red' : ''}`}
                  style={{
                    transitionDelay: `${initialDelay + index * staggerDelay}s`,
                  }}
                >
                  {word}
                </span>
              </span>
            </span>
          ))}
        </Component>
      </div>
    );
  }
  
  // For normal text without HTML
  const words = text.split(' ');
  
  return (
    <div ref={containerRef} className="overflow-hidden">
      <Component className={className}>
        {words.map((word, index) => (
          <span key={index} className="inline-block mr-2">
            <span
              className="inline-block overflow-hidden"
              style={{
                transitionDelay: `${initialDelay + index * staggerDelay}s`,
              }}
            >
              <span
                className={`inline-block transition-transform duration-700 ease-out ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                }`}
                style={{
                  transitionDelay: `${initialDelay + index * staggerDelay}s`,
                }}
              >
                {word}
              </span>
            </span>
          </span>
        ))}
      </Component>
    </div>
  );
};

export default RevealText;
