// Analytics Verification Utility
// Ensures only GTM-53NK9DHX is implemented and removes any other analytics tags

export interface AnalyticsAudit {
  correctGTM: boolean;
  incorrectTags: string[];
  recommendations: string[];
  status: 'clean' | 'needs_cleanup' | 'error';
}

// List of old/incorrect analytics tags that should be removed
const INCORRECT_ANALYTICS_TAGS = [
  'G-P87VEZDJ7H',
  'G-6WVDYXYFM4', 
  'GTM-NV5Z3DL7',
  'UA-', // Universal Analytics (deprecated)
  'G-', // GA4 tags (we only want GTM)
];

// The only correct GTM tag
const CORRECT_GTM_ID = 'GTM-53NK9DHX';

export const auditAnalyticsTags = (): AnalyticsAudit => {
  const audit: AnalyticsAudit = {
    correctGTM: false,
    incorrectTags: [],
    recommendations: [],
    status: 'error'
  };

  try {
    // Check if correct GTM is present
    const scripts = document.querySelectorAll('script');
    let hasCorrectGTM = false;
    const foundTags: string[] = [];

    scripts.forEach(script => {
      const scriptContent = script.innerHTML || script.src || '';
      
      // Check for correct GTM
      if (scriptContent.includes(CORRECT_GTM_ID)) {
        hasCorrectGTM = true;
      }

      // Check for incorrect tags
      INCORRECT_ANALYTICS_TAGS.forEach(tag => {
        if (scriptContent.includes(tag)) {
          foundTags.push(tag);
        }
      });
    });

    // Check dataLayer for GTM
    if (window.dataLayer && window.dataLayer.length > 0) {
      hasCorrectGTM = true;
    }

    audit.correctGTM = hasCorrectGTM;
    audit.incorrectTags = [...new Set(foundTags)]; // Remove duplicates

    // Generate recommendations
    if (!hasCorrectGTM) {
      audit.recommendations.push('GTM-53NK9DHX is not properly implemented');
    }

    if (audit.incorrectTags.length > 0) {
      audit.recommendations.push(`Remove these incorrect analytics tags: ${audit.incorrectTags.join(', ')}`);
    }

    // Determine status
    if (hasCorrectGTM && audit.incorrectTags.length === 0) {
      audit.status = 'clean';
    } else if (audit.incorrectTags.length > 0) {
      audit.status = 'needs_cleanup';
    } else {
      audit.status = 'error';
    }

  } catch (error) {
    console.error('Analytics audit failed:', error);
    audit.recommendations.push('Analytics audit failed - check console for errors');
  }

  return audit;
};

// Clean up incorrect analytics tags
export const cleanupIncorrectAnalytics = (): void => {
  try {
    const scripts = document.querySelectorAll('script');
    let removedCount = 0;

    scripts.forEach(script => {
      const scriptContent = script.innerHTML || script.src || '';
      
      // Check if script contains incorrect analytics tags
      const hasIncorrectTag = INCORRECT_ANALYTICS_TAGS.some(tag => 
        scriptContent.includes(tag)
      );

      // Don't remove if it also contains the correct GTM
      const hasCorrectGTM = scriptContent.includes(CORRECT_GTM_ID);

      if (hasIncorrectTag && !hasCorrectGTM) {
        console.warn('Removing incorrect analytics script:', scriptContent.substring(0, 100));
        script.remove();
        removedCount++;
      }
    });

    if (removedCount > 0) {
      console.log(`Cleaned up ${removedCount} incorrect analytics scripts`);
    }

  } catch (error) {
    console.error('Analytics cleanup failed:', error);
  }
};

// Verify GTM is working correctly
export const verifyGTMImplementation = (): boolean => {
  try {
    // Check if dataLayer exists
    if (!window.dataLayer) {
      console.error('GTM dataLayer not found');
      return false;
    }

    // Check if GTM script is loaded
    const gtmScripts = document.querySelectorAll('script[src*="googletagmanager.com"]');
    const hasGTMScript = Array.from(gtmScripts).some(script => 
      script.src.includes(CORRECT_GTM_ID)
    );

    if (!hasGTMScript) {
      console.error('GTM script not found or incorrect ID');
      return false;
    }

    // Check if noscript iframe exists
    const noscriptIframes = document.querySelectorAll('noscript iframe[src*="googletagmanager.com"]');
    const hasNoscriptIframe = Array.from(noscriptIframes).some(iframe => 
      iframe.src.includes(CORRECT_GTM_ID)
    );

    if (!hasNoscriptIframe) {
      console.warn('GTM noscript iframe not found - this may affect tracking for users with JavaScript disabled');
    }

    console.log('✅ GTM-53NK9DHX is properly implemented');
    return true;

  } catch (error) {
    console.error('GTM verification failed:', error);
    return false;
  }
};

// Initialize analytics verification on page load
export const initializeAnalyticsVerification = (): void => {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runVerification);
  } else {
    runVerification();
  }
};

const runVerification = (): void => {
  console.log('🔍 Running Analytics Verification...');
  
  // Audit current implementation
  const audit = auditAnalyticsTags();
  
  console.log('Analytics Audit Results:', audit);
  
  // Clean up if needed
  if (audit.status === 'needs_cleanup') {
    console.log('🧹 Cleaning up incorrect analytics tags...');
    cleanupIncorrectAnalytics();
  }
  
  // Verify GTM implementation
  setTimeout(() => {
    const isGTMWorking = verifyGTMImplementation();
    
    if (isGTMWorking) {
      console.log('✅ Analytics verification complete - GTM-53NK9DHX only');
    } else {
      console.error('❌ Analytics verification failed - check implementation');
    }
  }, 1000); // Wait 1 second for GTM to load
};

// Export for manual testing
export const manualAnalyticsCheck = (): void => {
  console.log('=== MANUAL ANALYTICS CHECK ===');
  
  const audit = auditAnalyticsTags();
  console.log('Audit Results:', audit);
  
  const isGTMWorking = verifyGTMImplementation();
  console.log('GTM Working:', isGTMWorking);
  
  console.log('DataLayer Contents:', window.dataLayer);
  
  // Check for any remaining incorrect tags
  const scripts = Array.from(document.querySelectorAll('script'));
  const analyticsScripts = scripts.filter(script => {
    const content = script.innerHTML + script.src;
    return content.includes('google') || content.includes('gtag') || content.includes('analytics');
  });
  
  console.log('All Analytics Scripts Found:', analyticsScripts.map(script => ({
    src: script.src,
    content: script.innerHTML.substring(0, 100)
  })));
  
  console.log('=== END MANUAL CHECK ===');
};

// Make available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).manualAnalyticsCheck = manualAnalyticsCheck;
}
