-- Job Applications Table
CREATE TABLE IF NOT EXISTS public.job_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  position TEXT NOT NULL,
  department TEXT,
  experience TEXT,
  education TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending' -- pending, reviewing, interviewed, accepted, rejected
);

-- Add Row Level Security (RLS) policies
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Create policy for admins (assuming you have a role-based auth system)
CREATE POLICY "Admins can do anything" ON public.job_applications
  FOR ALL 
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');
  
-- Create policy to allow users to create their own applications
CREATE POLICY "Users can create their own applications" ON public.job_applications
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);
  
-- Create policy to allow users to view their own applications
CREATE POLICY "Users can view their own applications" ON public.job_applications
  FOR SELECT 
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Create policy to allow anonymous submissions if needed
-- Uncomment this if you want to allow applications without authentication
/*
CREATE POLICY "Public can create applications" ON public.job_applications
  FOR INSERT 
  TO anon
  WITH CHECK (true);
*/

-- Set up Storage for Resume Files
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', false)
ON CONFLICT (id) DO NOTHING;

-- Create policy to allow authenticated users to upload resume files
CREATE POLICY "Users can upload resume files"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'resumes' AND auth.role() = 'authenticated');
  
-- Create policy to allow users to access their own resume files
CREATE POLICY "Users can access their own resume files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Create policy to allow admins to access all resume files
CREATE POLICY "Admins can access all resume files"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'resumes' AND auth.jwt() ->> 'role' = 'admin');

-- Create Notify Function for new applications
CREATE OR REPLACE FUNCTION public.handle_new_application()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('new_application', json_build_object(
    'id', NEW.id,
    'name', NEW.first_name || ' ' || NEW.last_name,
    'position', NEW.position,
    'created_at', NEW.created_at
  )::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create Trigger for new applications
CREATE TRIGGER on_new_application
  AFTER INSERT ON public.job_applications
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_application();

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

-- Allow admins to manage job listings
CREATE POLICY "Admins can manage job listings" ON public.job_listings
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin'); 