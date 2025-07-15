import { Request, Response } from 'express';
import { supabaseAdmin } from '../config/supabase';

// Mock job listings data
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
export const getJobs = async (req: Request, res: Response) => {
  try {
    // Log for debugging
    console.log('Fetching job listings');
    
    // Check if supabaseAdmin is configured
    if (supabaseAdmin && process.env.SUPABASE_SERVICE_KEY !== 'your_supabase_service_role_key') {
      // Attempt to use Supabase if properly configured
      try {
        const { data, error } = await supabaseAdmin
          .from('job_listings')
          .select('*')
          .eq('is_active', true)
          .order('posted_date', { ascending: false });
          
        if (error) {
          console.error('Error fetching job listings from Supabase:', error);
          throw new Error('Falling back to mock data');
        }
        
        // Parse responsibilities from JSONB to array for each job
        const parsedData = data.map((job: any) => ({
          ...job,
          responsibilities: Array.isArray(job.responsibilities) 
            ? job.responsibilities 
            : JSON.parse(job.responsibilities)
        }));
        
        return res.status(200).json(parsedData);
      } catch (supabaseError) {
        console.warn('Using mock job data due to Supabase error');
        // Fall through to mock data
      }
    }
    
    // Return mock data if Supabase is not available
    console.log('Returning mock job listings data');
    return res.status(200).json(mockJobs);
  } catch (error) {
    console.error('Error in getJobs controller:', error);
    // Still return mock data on error to avoid frontend issues
    return res.status(200).json(mockJobs);
  }
};

/**
 * Get a specific job by ID
 */
export const getJobById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Log for debugging
    console.log(`Fetching job with ID: ${id}`);
    
    if (!id) {
      return res.status(400).json({ message: 'Job ID is required' });
    }
    
    // Check if supabaseAdmin is configured
    if (supabaseAdmin && process.env.SUPABASE_SERVICE_KEY !== 'your_supabase_service_role_key') {
      // Attempt to use Supabase if properly configured
      try {
        const { data, error } = await supabaseAdmin
          .from('job_listings')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error('Error fetching job by ID from Supabase:', error);
          throw new Error('Falling back to mock data');
        }
        
        if (!data) {
          return res.status(404).json({ message: 'Job not found' });
        }
        
        // Parse responsibilities from JSONB to array
        const parsedData = {
          ...data,
          responsibilities: Array.isArray(data.responsibilities) 
            ? data.responsibilities 
            : JSON.parse(data.responsibilities)
        };
        
        return res.status(200).json(parsedData);
      } catch (supabaseError) {
        console.warn('Using mock job data due to Supabase error');
        // Fall through to mock data
      }
    }
    
    // Find the job in mock data
    const mockJob = mockJobs.find(job => job.id === parseInt(id, 10));
    
    if (!mockJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    console.log('Returning mock job data for ID:', id);
    return res.status(200).json(mockJob);
  } catch (error) {
    console.error('Error in getJobById controller:', error);
    return res.status(500).json({ message: 'An unexpected error occurred' });
  }
}; 