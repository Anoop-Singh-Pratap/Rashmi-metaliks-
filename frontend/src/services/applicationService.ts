import { uploadFile } from '../lib/supabase';

export interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department?: string;
  experience?: string;
  education?: string;
  resumeUrl?: string;
  coverLetter?: string;
  source?: string;
}

export interface ApplicationResponse {
  success: boolean;
  error?: string;
  applicationId?: string;
  databaseId?: string;
}

/**
 * Submit a job application via the secured backend API
 */
export const submitApplication = async (data: ApplicationData, resumeFile: File | null): Promise<ApplicationResponse> => {
  try {
    // Create a FormData object to handle the file upload
    const formData = new FormData();
    
    // Add all form fields to FormData
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        formData.append(key, value as string);
      }
    });
    
    // Add resume if available
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }
    
    // Submit application data to the backend API
    const response = await fetch('/api/applications', {
      method: 'POST',
      body: formData,
      // Add timeout to prevent hanging requests
      signal: AbortSignal.timeout(120000) // 120 second timeout for file uploads
    });
    
    // Check if response is ok before trying to parse JSON
    if (!response.ok) {
      console.error('Server responded with error:', response.status, response.statusText);
      
      // Try to parse JSON response for error details
      let errorMessage = 'Failed to submit application';
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (jsonError) {
        // If JSON parsing fails, use status text
        errorMessage = `Server error: ${response.status} ${response.statusText}`;
      }
      
      return { 
        success: false, 
        error: errorMessage 
      };
    }
    
    // Try to parse successful response
    let result;
    try {
      result = await response.json();
    } catch (jsonError) {
      console.error('Failed to parse response JSON:', jsonError);
      return { 
        success: false, 
        error: 'Server returned invalid response format' 
      };
    }
    
    return { 
      success: true,
      applicationId: result.applicationId,
      databaseId: result.databaseId
    };
  } catch (error) {
    console.error('Error in application submission:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred' 
    };
  }
}; 