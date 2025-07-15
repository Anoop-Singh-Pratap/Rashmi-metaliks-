export interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string;
  responsibilities: string[];
  is_active: boolean;
  posted_date: string;
  closing_date?: string;
  salary_range?: string;
  featured: boolean;
}

/**
 * Fetch all active job listings from the backend API
 */
export const fetchJobListings = async (): Promise<JobListing[]> => {
  try {
    const response = await fetch('/api/jobs');
    
    if (!response.ok) {
      console.error('Error fetching job listings:', response.statusText);
      return getFallbackJobListings();
    }
    
    const data = await response.json();
    
    if (!data || data.length === 0) {
      console.log('No job listings found, using fallback data');
      return getFallbackJobListings();
    }
    
    return data;
  } catch (error) {
    console.error('Error in job listings fetch:', error);
    // Return fallback data
    return getFallbackJobListings();
  }
};

/**
 * Get fallback job listings data for development/testing
 */
const getFallbackJobListings = (): JobListing[] => {
  return [
    {
      id: "1",
      title: "Production Engineer",
      department: "Manufacturing",
      location: "Durgapur, West Bengal",
      type: "Full-time",
      description: "We are seeking a skilled Production Engineer to join our manufacturing team in Durgapur.",
      requirements: "Bachelor's degree in Mechanical or Metallurgical Engineering with 3+ years of experience in steel manufacturing.",
      responsibilities: [
        "Monitor production processes and optimize workflow",
        "Implement quality control procedures",
        "Troubleshoot equipment issues",
        "Collaborate with maintenance team for preventive maintenance",
        "Prepare production reports and documentation"
      ],
      is_active: true,
      posted_date: "2023-08-15",
      closing_date: "2023-09-15",
      salary_range: "Competitive",
      featured: true
    },
    {
      id: "2",
      title: "Quality Control Specialist",
      department: "Quality Assurance",
      location: "Kharagpur, West Bengal",
      type: "Full-time",
      description: "Join our Quality Assurance team to ensure our products meet the highest industry standards.",
      requirements: "Bachelor's degree in Metallurgy or Materials Science with experience in steel quality testing.",
      responsibilities: [
        "Conduct quality tests on finished products",
        "Prepare test reports and certification documentation",
        "Implement quality management systems",
        "Train production staff on quality standards",
        "Monitor compliance with international standards"
      ],
      is_active: true,
      posted_date: "2023-08-10",
      closing_date: "2023-09-10",
      salary_range: "As per industry standards",
      featured: false
    }
  ];
};

/**
 * Fetch a single job listing by ID from the backend API
 */
export const fetchJobById = async (id: string): Promise<JobListing | null> => {
  try {
    const response = await fetch(`/api/jobs/${id}`);
    
    if (!response.ok) {
      console.error('Error fetching job listing:', response.statusText);
      return null;
    }
    
    const data = await response.json();
    
    if (!data) return null;
    
    return data;
  } catch (error) {
    console.error('Error in job fetch:', error);
    return null;
  }
}; 