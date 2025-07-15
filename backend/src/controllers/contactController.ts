import { Request, Response } from 'express';
import Joi from 'joi';
import { v4 as uuidv4 } from 'uuid';
import { ContactFormData } from '../types/contact';
import { sendContactFormEmail } from '../services/emailService';
import { sendCustomContactFormEmail } from '../services/customEmailService';

// In-memory store for submissions when email sending fails
const contactSubmissionsStore: ContactFormData[] = [];

// Validation schema for contact form
const contactFormSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().pattern(/^[a-zA-Z\s.'-]+$/).messages({
    'string.pattern.base': 'Name can only contain letters, spaces, dots, hyphens, and apostrophes'
  }),
  email: Joi.string().email().required().max(255),
  subject: Joi.string().trim().min(5).max(200).required(),
  message: Joi.string().trim().min(10).max(2000).required(),
  selectedProducts: Joi.array().items(Joi.string().max(100)).optional()
});

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    // Validate and sanitize input
    const { error, value } = contactFormSchema.validate(req.body, { 
      stripUnknown: true,
      abortEarly: false 
    });
    
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: error.details.map(detail => detail.message)
      });
    }
    
    const contactData: ContactFormData = value;
    
    // Generate a secure reference ID for tracking
    const referenceId = `RMQ-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // Store submission data in memory regardless of email success
    contactSubmissionsStore.push({
      ...contactData,
      referenceId
    });
    
    console.log(`New contact form submission stored - Ref: ${referenceId}`, contactData);
    console.log(`Total stored submissions: ${contactSubmissionsStore.length}`);
    
    // Send emails asynchronously - fire and forget
    const sendEmailsAsync = async () => {
      try {
        const emailSent = await sendContactFormEmail(contactData);
        if (emailSent) {
          console.log(`Contact form email sent to original service successfully - Ref: ${referenceId}`);
        }
      } catch (error) {
        console.error(`Error sending primary contact email:`, error);
      }
      
      try {
        const customEmailSent = await sendCustomContactFormEmail(contactData);
        if (customEmailSent) {
          console.log(`Contact form email sent to custom service successfully - Ref: ${referenceId}`);
        }
      } catch (error) {
        console.error(`Error sending custom contact form email:`, error);
      }
    };

    // Start email sending process in background without waiting
    sendEmailsAsync().catch(error => {
      console.error(`Background email processing failed for contact form - Ref: ${referenceId}:`, error);
    });
    
    // Return immediate success response
    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
      referenceId: referenceId
    });
    
  } catch (error) {
    console.error('Error processing contact form submission:', error);
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
}; 