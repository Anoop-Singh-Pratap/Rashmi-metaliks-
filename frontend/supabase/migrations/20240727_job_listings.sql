-- Job Listings Table
CREATE TABLE IF NOT EXISTS public.job_listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  responsibilities JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  posted_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  closing_date TIMESTAMP WITH TIME ZONE,
  salary_range TEXT,
  featured BOOLEAN DEFAULT false
);

-- Add initial sample data to job listings
INSERT INTO public.job_listings (
  title, 
  department, 
  location, 
  type, 
  description, 
  requirements, 
  responsibilities, 
  is_active
) VALUES
  (
    'Process Engineer',
    'Manufacturing',
    'Kharagpur, WB',
    'Full-time',
    'Optimize production processes for our state-of-the-art manufacturing facility.',
    'B.Tech in Metallurgy or related field, 3+ years experience in steel manufacturing. Knowledge of DI pipe production is a plus.',
    '["Monitor and optimize manufacturing processes", "Implement quality control procedures", "Identify opportunities for process improvement", "Work with cross-functional teams to increase efficiency"]',
    true
  ),
  (
    'Quality Control Manager',
    'Quality',
    'Jhargram, WB',
    'Full-time',
    'Ensure our products meet the highest quality standards through rigorous testing and inspection.',
    'B.Tech in Metallurgy/Materials Science with 5+ years in QA/QC role in steel industry. Knowledge of international standards required.',
    '["Oversee quality testing of raw materials and finished products", "Maintain documentation of quality testing results", "Train staff on quality control procedures", "Implement improvements to quality management systems"]',
    true
  ),
  (
    'Sales Executive',
    'Sales',
    'Kolkata, WB',
    'Full-time',
    'Drive business development and expand our customer base across domestic and international markets.',
    'Bachelor''s degree with 3+ years in B2B sales, preferably in industrial products. Excellent communication and negotiation skills.',
    '["Identify and approach potential clients", "Maintain relationships with existing customers", "Prepare and present product demonstrations", "Meet or exceed sales targets"]',
    true
  ),
  (
    'IT Systems Analyst',
    'IT',
    'Kolkata, WB',
    'Full-time',
    'Support and improve our IT infrastructure and enterprise systems to ensure smooth business operations.',
    'Bachelor''s in Computer Science or IT with 2+ years experience. Knowledge of ERP systems and industrial automation a plus.',
    '["Maintain and troubleshoot IT systems", "Implement new technologies to improve efficiency", "Provide technical support to employees", "Ensure data security and integrity"]',
    true
  );

-- Add Row Level Security (RLS) policies for job listings
ALTER TABLE public.job_listings ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read active job listings
CREATE POLICY "Anyone can view active job listings" ON public.job_listings
  FOR SELECT
  TO anon
  USING (is_active = true);

-- Allow authenticated users to view active job listings
CREATE POLICY "Authenticated users can view active job listings" ON public.job_listings
  FOR SELECT
  TO authenticated
  USING (is_active = true); 