import { Request, Response } from 'express';
import Joi from 'joi';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { sendJobApplicationEmail, JobApplicationData } from '../services/emailService';

// Enhanced validation schema for application data
const applicationSchema = Joi.object({
  firstName: Joi.string().required().trim().min(2).max(100).pattern(/^[a-zA-Z\s.'-]+$/).messages({
    'string.pattern.base': 'First name can only contain letters, spaces, dots, hyphens, and apostrophes'
  }),
  lastName: Joi.string().required().trim().min(2).max(100).pattern(/^[a-zA-Z\s.'-]+$/).messages({
    'string.pattern.base': 'Last name can only contain letters, spaces, dots, hyphens, and apostrophes'
  }),
  email: Joi.string().email().required().trim().max(255),
  phone: Joi.string().required().trim().pattern(/^[\+]?[0-9\s\-\(\)]{7,20}$/).messages({
    'string.pattern.base': 'Please enter a valid phone number'
  }),
  position: Joi.string().required().trim().min(2).max(255),
  department: Joi.string().allow('').trim().max(100),
  experience: Joi.string().allow('').trim().max(500),
  education: Joi.string().allow('').trim().max(500),
  coverLetter: Joi.string().allow('').trim().max(5000),
  source: Joi.string().allow('').trim().max(100)
});

// In-memory store for applications (since we removed database storage)
export const applicationSubmissionsStore: JobApplicationData[] = [];

/**
 * Submit a job application (Email-only, no database storage)
 */
export const submitApplication = async (req: Request, res: Response) => {
  try {
    const { 
      firstName, lastName, email, phone, position,
      department, experience, education, coverLetter, source 
    } = req.body;
    
    console.log('Received application submission:', { firstName, lastName, email, position });
    
    // Validate request data
    const { error: validationError } = applicationSchema.validate(req.body);
    if (validationError) {
      console.error('Validation error:', validationError.details[0].message);
      return res.status(400).json({ 
        message: 'Invalid application data', 
        error: validationError.details[0].message 
      });
    }
    
    // Generate secure application reference ID
    const applicationId = `RMJOB-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // Cast req to include multer's file property
    const multerReq = req as Request & { file?: Express.Multer.File };
    
    // Prepare application data for email (no resume URL since we're not storing files)
    const applicationData: JobApplicationData = {
      firstName,
      lastName,
      email,
      phone,
      position,
      department,
      experience,
      education,
      resumeUrl: undefined, // No file storage for now
      coverLetter,
      source,
      applicationId
    };
    
    // Store in memory for backup/tracking
    applicationSubmissionsStore.push(applicationData);
    console.log(`Application stored in memory - Total applications: ${applicationSubmissionsStore.length}`);
    
    // Send emails asynchronously without blocking the response
    const sendEmailsAsync = async () => {
      try {
        await sendJobApplicationEmail(applicationData, multerReq.file);
        console.log(`Application email sent to HR for ${firstName} ${lastName}`);
      } catch (emailError) {
        const errorMessage = emailError instanceof Error ? emailError.message : 'Unknown email error';
        console.error('Error sending application email to HR:', errorMessage);
      }
    };
    
    // Start email sending process in background
    sendEmailsAsync().catch(error => {
      console.error(`Background email processing failed for application ${applicationId}:`, error);
    });
    
    // Return immediate success response without waiting for emails
    return res.status(201).json({ 
      message: 'Application submitted successfully',
      applicationId: applicationId,
      note: 'Your application has been received and is being processed. You will receive a confirmation email shortly.',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in submitApplication controller:', error);
    
    // Ensure we always return valid JSON
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    
    return res.status(500).json({ 
      message: 'An unexpected error occurred',
      error: errorMessage,
      timestamp: new Date().toISOString()
    });
  }
}; 