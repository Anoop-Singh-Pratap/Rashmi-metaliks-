-- Fix RLS policies for resume uploads and job applications

-- Drop the existing storage policy with a restrictive condition
DROP POLICY IF EXISTS "Users can upload resume files" ON storage.objects;

-- Create a more permissive policy for resume uploads
CREATE POLICY "Anyone can upload resume files"
  ON storage.objects FOR INSERT
  TO anon, authenticated
  WITH CHECK (bucket_id = 'resumes');

-- Create policy to allow public to access resume files
CREATE POLICY "Public can access resume files"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'resumes');

-- Fix job applications policy to allow anonymous submissions
DROP POLICY IF EXISTS "Users can create their own applications" ON public.job_applications;

CREATE POLICY "Anyone can create applications" ON public.job_applications
  FOR INSERT 
  TO anon, authenticated
  WITH CHECK (true);

-- Make the bucket public if it's not already
UPDATE storage.buckets
SET public = true
WHERE id = 'resumes';

-- Verify storage policies
SELECT
  policy_name,
  definition,
  roles
FROM
  pg_policies
WHERE
  tablename = 'objects'
  AND schemaname = 'storage';

-- Verify job applications policies
SELECT
  policy_name,
  definition,
  roles
FROM
  pg_policies
WHERE
  tablename = 'job_applications'
  AND schemaname = 'public'; 