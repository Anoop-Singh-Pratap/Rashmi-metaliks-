import { Request, Response } from 'express';
// import { supabaseAdmin } from '../config/supabase';

// In-memory store for job listings (mock data)
const mockJobs = [
  {
    id: 1,
    title: "Senior Process Engineer",
    department: "Manufacturing",
    location: "Kharagpur, West Bengal",
    job_type: "Full-time",
    experience_level: "5-8 years",
    education: "B.Tech/B.E. in Metallurgy/Mechanical Engineering",
    salary_range: "₹10,00,000 - ₹15,00,000 per annum",
    posted_date: "2023-09-15",
    closing_date: "2023-10-15",
    is_active: true,
    description: "We are looking for a Senior Process Engineer to join our team at Rashmi Metaliks. The ideal candidate will have extensive experience in steel manufacturing processes and will be responsible for optimizing production efficiency.",
    responsibilities: [
      "Design and implement process improvements to enhance production efficiency",
      "Monitor and analyze production data to identify areas for improvement",
      "Collaborate with cross-functional teams to resolve technical issues",
      "Ensure compliance with quality standards and safety regulations",
      "Train and mentor junior engineers"
    ]
  },
  {
    id: 2,
    title: "Quality Control Manager",
    department: "Quality Assurance",
    location: "Kharagpur, West Bengal",
    job_type: "Full-time",
    experience_level: "8-10 years",
    education: "B.Tech/B.E. in Metallurgy/Mechanical Engineering",
    salary_range: "₹12,00,000 - ₹18,00,000 per annum",
    posted_date: "2023-09-10",
    closing_date: "2023-10-10",
    is_active: true,
    description: "We are seeking a Quality Control Manager to oversee all quality assurance activities at our manufacturing facility. The ideal candidate will have a strong background in quality management systems and steel industry experience.",
    responsibilities: [
      "Develop and implement quality control policies and procedures",
      "Lead quality audits and inspections of manufacturing processes",
      "Analyze quality data and prepare reports for management",
      "Investigate customer complaints and non-conformance issues",
      "Ensure compliance with international quality standards (ISO 9001, etc.)"
    ]
  }
];

/**
 * Get all active job listings
 */
export const getJobListings = async (req: Request, res: Response) => {
  try {
    console.log('Fetching job listings from mock data');
    res.status(200).json(mockJobs);
  } catch (error) {
    console.error('Error fetching job listings:', error);
    res.status(500).json({ message: 'Error fetching job listings' });
  }
};

/**
 * Get a specific job by ID
 */
export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    console.log(`Fetching job by ID from mock data: ${id}`);
    
    const jobId = parseInt(id, 10);
    const job = mockJobs.find(j => j.id === jobId);
    
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: 'Job not found' });
    }
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    res.status(500).json({ message: 'Error fetching job by ID' });
  }
}; 