import { Request, Response } from 'express';
import Joi from 'joi';
import { VendorFormData } from '../types/vendor';
import { sendVendorRegistrationEmail } from '../services/emailService';

// In-memory store with metadata for duplicate detection and stats
interface StoredSubmission {
  data: VendorFormData;
  files?: Array<{ filename: string; size: number }> | null;
  timestamp: number;
  ip: string;
  id: string;
  userAgent?: string;
  fingerprint: string;
}

const vendorSubmissionsStore: StoredSubmission[] = [];

// Validation schema for vendor registration
const vendorFormSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().pattern(/^[a-zA-Z\s.'-]+$/).messages({
    'string.pattern.base': 'Name can only contain letters, spaces, dots, hyphens, and apostrophes'
  }),
  designation: Joi.string().trim().min(2).max(100).required(),
  companyName: Joi.string().trim().min(2).max(200).required(),
  firmType: Joi.string().valid('manufacturer', 'dealer', 'oem-distributor', 'service', 'consultant', 'contractor', 'transport').required(),
  vendorType: Joi.string().valid('domestic', 'global').required(),
  country: Joi.string().trim().min(2).max(100).required(),
  address: Joi.string().trim().max(500).optional().allow(''),
  customCountry: Joi.string().trim().allow('').optional(),
  customCountryCode: Joi.string().trim().allow('').optional(),
  contactNo: Joi.string().pattern(/^[\+]?[0-9\s\-\(\)]{7,20}$/).required().messages({
    'string.pattern.base': 'Please enter a valid phone number'
  }),
  email: Joi.string().email().required().max(255),
  category: Joi.string().trim().min(2).max(200).required(),
  productDescription: Joi.string().trim().min(10).max(2000).required(),
  turnover: Joi.number().min(0.1).required(),
  turnoverCurrency: Joi.string().valid('INR', 'USD').required(),
  gstNumber: Joi.string().optional().allow('').pattern(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/).messages({
    'string.pattern.base': 'Please enter a valid GST number'
  }),
  terms: Joi.boolean().optional(),
  referenceId: Joi.string().trim().optional()
});

// Helpers for duplicate detection
const generateFingerprint = (vendorData: VendorFormData, ip: string, userAgent?: string): string => {
  const raw = `${(vendorData.email || '').toLowerCase()}-${(vendorData.companyName || '').toLowerCase()}-${vendorData.contactNo || ''}-${ip}-${userAgent || ''}`;
  return Buffer.from(raw).toString('base64');
};

const isDuplicateSubmission = (vendorData: VendorFormData, ip: string, userAgent?: string): { isDuplicate: boolean; reason?: string; existingSubmission?: StoredSubmission } => {
  const now = Date.now();
  const windowMs = 24 * 60 * 60 * 1000; // 24 hours
  const fingerprint = generateFingerprint(vendorData, ip, userAgent);

  for (const s of vendorSubmissionsStore) {
    if (now - s.timestamp > windowMs) continue;
    if ((s.data.email || '').toLowerCase() === (vendorData.email || '').toLowerCase()) {
      return { isDuplicate: true, reason: 'DUPLICATE_EMAIL', existingSubmission: s };
    }
    if (s.data.contactNo === vendorData.contactNo && (s.data.companyName || '').toLowerCase() === (vendorData.companyName || '').toLowerCase()) {
      return { isDuplicate: true, reason: 'DUPLICATE_PHONE_COMPANY', existingSubmission: s };
    }
    if (s.ip === ip && (s.data.companyName || '').toLowerCase() === (vendorData.companyName || '').toLowerCase()) {
      return { isDuplicate: true, reason: 'DUPLICATE_IP_COMPANY', existingSubmission: s };
    }
    if (s.fingerprint === fingerprint) {
      return { isDuplicate: true, reason: 'DUPLICATE_FINGERPRINT', existingSubmission: s };
    }
  }
  return { isDuplicate: false };
};

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
        errors: error.details.map(detail => detail.message),
        error: 'VALIDATION_ERROR'
      });
    }

    const vendorData: VendorFormData = value;
    const files = req.files as Express.Multer.File[] | undefined;

    // Determine IP and UA
    const ip = (req.ip || (req.headers['x-real-ip'] as string) || (req.headers['x-forwarded-for'] as string) || (req.connection as any)?.remoteAddress || 'unknown').toString();
    const userAgent = req.headers['user-agent'];

    // Generate referenceId if not provided
    if (!vendorData.referenceId) {
      vendorData.referenceId = `TOKEN-${Date.now().toString().slice(-6)}`;
    }

    // Duplicate detection
    const dup = isDuplicateSubmission(vendorData, ip, userAgent);
    if (dup.isDuplicate) {
      const existing = dup.existingSubmission!;
      const hoursAgo = Math.floor((Date.now() - existing.timestamp) / (1000 * 60 * 60));
      let message = 'A similar submission already exists.';
      switch (dup.reason) {
        case 'DUPLICATE_EMAIL':
          message = `A submission with this email address was already submitted ${hoursAgo} hours ago.`;
          break;
        case 'DUPLICATE_PHONE_COMPANY':
          message = 'A submission with this phone number and company combination already exists.';
          break;
        case 'DUPLICATE_IP_COMPANY':
          message = 'A submission for this company from your location was already submitted.';
          break;
        case 'DUPLICATE_FINGERPRINT':
          message = 'This exact submission was already processed.';
          break;
      }
      return res.status(409).json({
        success: false,
        message,
        error: dup.reason,
        existingSubmissionId: existing.id
      });
    }

    // Create submission id and fingerprint, then store
    const submissionId = `SUB-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const fingerprint = generateFingerprint(vendorData, ip, userAgent);

    vendorSubmissionsStore.push({
      data: vendorData,
      files: files?.length
        ? files.map(f => ({ filename: f.originalname, size: f.size }))
        : null,
      timestamp: Date.now(),
      ip,
      id: submissionId,
      userAgent,
      fingerprint
    });

    console.log('New vendor registration stored', {
      submissionId,
      referenceId: vendorData.referenceId,
      email: vendorData.email,
      company: vendorData.companyName,
      filesCount: files?.length || 0,
      ip
    });

    // Try to send email notifications (do not fail the response if email fails)
    let emailSent = false;
    try {
      emailSent = await sendVendorRegistrationEmail(vendorData, files);
    } catch (e) {
      console.error('Error sending vendor registration email:', e);
    }

    return res.status(200).json({
      success: true,
      message: 'Vendor registration submitted successfully',
      referenceId: vendorData.referenceId,
      submissionId,
      emailSent,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing vendor registration:', error);
    return res.status(500).json({
      success: false,
      message: 'An unexpected error occurred'
    });
  }
};

// Export stats handler for router
export const getSubmissionStats = (req: Request, res: Response) => {
  const now = Date.now();
  const last24Hours = vendorSubmissionsStore.filter(s => now - s.timestamp < 24 * 60 * 60 * 1000);
  const last7Days = vendorSubmissionsStore.filter(s => now - s.timestamp < 7 * 24 * 60 * 60 * 1000);
  return res.json({
    total: vendorSubmissionsStore.length,
    last24Hours: last24Hours.length,
    last7Days: last7Days.length,
    oldestSubmission: vendorSubmissionsStore.length > 0 ? new Date(Math.min(...vendorSubmissionsStore.map(s => s.timestamp))).toISOString() : null,
    newestSubmission: vendorSubmissionsStore.length > 0 ? new Date(Math.max(...vendorSubmissionsStore.map(s => s.timestamp))).toISOString() : null
  });
};