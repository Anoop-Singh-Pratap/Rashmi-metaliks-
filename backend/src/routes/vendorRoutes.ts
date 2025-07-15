import express from 'express';
import multer from 'multer';
import { submitVendorRegistration } from '../controllers/vendorController';

const router = express.Router();

// Enhanced multer configuration with security
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { 
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 3, // Maximum 3 files
    fieldSize: 1024 * 1024 // 1MB field size limit
  },
  fileFilter: (req, file, cb) => {
    // Allowed file types for vendor documents
    const allowedMimeTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const allowedExtensions = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
    const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, JPG, PNG, DOC, and DOCX files are allowed.'));
    }
  }
});

// POST /api/vendors - Submit vendor registration with document upload
router.post('/', upload.array('supportingDocuments', 3), submitVendorRegistration);

export { router as vendorRoutes }; 