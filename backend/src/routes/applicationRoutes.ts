import express from 'express';
import multer from 'multer';
import { submitApplication } from '../controllers/applicationController';

const router = express.Router();

// Enhanced multer configuration with security for resume uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { 
    fileSize: 5 * 1024 * 1024, // 5MB limit for resumes
    fieldSize: 1024 * 1024 // 1MB field size limit
  },
  fileFilter: (req, file, cb) => {
    // Allowed file types for resumes
    const allowedMimeTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const fileExtension = file.originalname.toLowerCase().substring(file.originalname.lastIndexOf('.'));
    
    if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(fileExtension)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed for resumes.'));
    }
  }
});

// POST /api/applications - Submit a job application with file upload
router.post('/', upload.single('resume'), submitApplication);

export { router as applicationRoutes }; 