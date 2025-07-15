# Fixing Row Level Security (RLS) Policy Issues

Your application is encountering 403 Unauthorized errors when trying to upload resume files and submit job applications. This is due to Row Level Security (RLS) policies in Supabase that are too restrictive.

## The Problem

The errors you're seeing:
```
POST https://kpoiglmmrwohcudsgufg.supabase.co/storage/v1/object/resumes/job-applications/0azgeixrsekl.pdf 400 (Bad Request)
Error uploading file: {statusCode: '403', error: 'Unauthorized', message: 'new row violates row-level security policy'}
Error in application submission: {statusCode: '403', error: 'Unauthorized', message: 'new row violates row-level security policy'}
```

These errors indicate that:
1. The current RLS policies do not allow anonymous or authenticated users to upload files to the 'resumes' bucket
2. The current RLS policies do not allow anonymous or authenticated users to insert rows into the 'job_applications' table

## The Solution

I've created a SQL fix file (`supabase/fix_rls_policies.sql`) that updates the RLS policies to allow file uploads and job application submissions. Here's how to apply the fix:

### Option 1: Run the SQL in Supabase Dashboard (Recommended)

1. Log in to your Supabase dashboard
2. Go to the SQL Editor
3. Create a new query
4. Copy and paste the contents of `supabase/fix_rls_policies.sql`
5. Click "Run"

### Option 2: Using the Supabase REST API

If you're familiar with the Supabase REST API, you can execute SQL using the rpc endpoint:

```
curl -X POST 'https://YOUR_PROJECT_ID.supabase.co/rest/v1/rpc/exec_sql' \
  -H 'apikey: YOUR_ANON_KEY' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  --data '{"sql": "-- Copy and paste the contents of fix_rls_policies.sql here"}'
```

Replace YOUR_PROJECT_ID and YOUR_ANON_KEY with your actual values.

## What the Fix Does

The SQL script:

1. Drops the existing restrictive storage policy and replaces it with a more permissive one
2. Creates a policy to allow public access to resume files (for viewing)
3. Updates the job applications policy to allow submissions from non-authenticated users
4. Makes the 'resumes' bucket public
5. Includes verification queries to check the updated policies

## Testing the Fix

After applying the fix:

1. Try submitting a job application with a resume upload again
2. The form should submit successfully without 403 errors

## Long-term Security Considerations

This fix allows anonymous users to upload files and submit applications, which is likely what you want for a public job application form. However, consider these security points:

1. The 'resumes' bucket is now public, which means anyone with the URL can access uploaded files
2. You may want to implement server-side validation to prevent abuse
3. Consider adding file size limits and type restrictions in your frontend code

If you need more restricted access later, you can modify the RLS policies to be more specific. 
 