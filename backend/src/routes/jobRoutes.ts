import express from 'express';
import { getJobs, getJobById } from '../controllers/jobController';

const router = express.Router();

// GET /api/jobs - Get all active job listings
router.get('/', getJobs);

// GET /api/jobs/:id - Get a specific job by ID
router.get('/:id', getJobById);

export { router as jobRoutes }; 