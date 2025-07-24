import { Request, Response } from 'express';
import Joi from 'joi';
import { VendorFormData } from '../types/vendor';
import { sendVendorRegistrationEmail } from '../services/emailService';

// In-memory store for submissions when email sending fails
const vendorSubmissionsStore: Array<{
  data: VendorFormData,
  files?: Array<{filename: string, size: number}> | null
}> = [];

// Validation schema for vendor registration
const vendorFormSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().pattern(/^[a-zA-Z\s.'-]+$/).messages({
    'string.pattern.base': 'Name can only contain letters, spaces, dots, hyphens, and apostrophes'
  }),
  designation: Joi.string().trim().min(2).max(100).required(),
  companyName: Joi.string().trim().min(2).max(200).required(),
  firmType: Joi.string().valid('manufacturer', 'dealer', 'oem-distributor', 'service', 'consultant').required(),
  vendorType: Joi.string().valid('domestic', 'global').required(),
  country: Joi.string().trim().min(2).max(100).required(),
  contactNo: Joi.string().pattern(/^[\+]?[0-9\s\-\(\)]{7,20}$/).required().messages({
    'string.pattern.base': 'Please enter a valid phone number'
  }),
  email: Joi.string().email().required().max(255),
  category: Joi.string().trim().min(2).max(200).required(),
  productDescription: Joi.string().trim().min(10).max(2000).required(),
  turnover: Joi.number().positive().required(),
  turnoverCurrency: Joi.string().valid('INR', 'USD').required(),
  gstNumber: Joi.string().optional().allow('').pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).messages({
    'string.pattern.base': 'Please enter a valid GST number'
  })
});

export const submitVendorRegistration = async (req: Request, res: Response) => {
  try {
    // Validate and sanitize input
    const { error, value } = vendorFormSchema.validate(req.body, { 
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
    
    const vendorData: VendorFormData = value;
    // Handle multiple files (array) instead of a single file
    const files = req.files as Express.Multer.File[] | undefined;

    // Store submission in memory regardless of email success
    vendorSubmissionsStore.push({
      data: vendorData,
      files: files?.length ? files.map(file => ({
        filename: file.originalname,
        size: file.size
      })) : null
    });

    console.log('New vendor registration stored:', vendorData);
    console.log(`Files received: ${files?.length || 0}`);
    console.log(`Total stored vendor submissions: ${vendorSubmissionsStore.length}`);

    // Send email asynchronously - fire and forget
    const sendEmailAsync = async () => {
      try {
        const emailSent = await sendVendorRegistrationEmail(vendorData, files);
        if (emailSent) {
          console.log('Vendor registration email sent successfully');
        }
      } catch (error) {
        console.error('Error sending vendor registration email:', error);
      }
    };

    // Start email sending process in background without waiting
    sendEmailAsync().catch(error => {
      console.error('Background email processing failed:', error);
    });

    // Return immediate success response
    return res.status(200).json({
      success: true,
      message: 'Vendor registration submitted successfully'
    });

  } catch (error) {
    console.error('Error processing vendor registration:', error);
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};