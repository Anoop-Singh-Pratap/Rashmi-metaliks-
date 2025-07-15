# Supabase Setup Guide

This guide will help you set up the Supabase backend required for this application.

## Prerequisites

1. A Supabase account (create one at [supabase.com](https://supabase.com))
2. A new Supabase project

## Setup Steps

### 1. Database Tables

The application requires the following tables:
- `job_listings`: For storing job openings
- `job_applications`: For storing job applications

You can create these tables using one of these methods:

#### Option 1: Run the complete schema.sql

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the entire contents of `supabase/schema.sql`
5. Click "Run"

#### Option 2: Run individual migrations

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Create a new query
4. Copy and paste the contents of `supabase/migrations/20240727_job_listings.sql`
5. Click "Run"

### 2. Update Environment Variables

After setting up your Supabase project, update your environment variables:

1. Open the `.env` file in your project
2. Update the Supabase URL and anon key with your project values:

```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

You can find these values in your Supabase dashboard under Project Settings > API.

## Common Issues

### "relation 'public.job_listings' does not exist" Error

If you see this error, it means the database table hasn't been created:

1. Follow the steps above to run the SQL migration files
2. Restart your application

### Authentication Issues

If you experience authentication issues:

1. Check that your Supabase URL and anon key are correct
2. Ensure Row Level Security (RLS) policies are properly set up in your database

## Testing Your Setup

After completing the setup:

1. Start your application
2. Navigate to the Careers page
3. You should see the sample job listings that were created during migration

If the job listings appear, your Supabase setup is working correctly!

## Advanced Configuration

### Email Notifications

To set up email notifications for job applications:

1. Configure Supabase Edge Functions (refer to Supabase documentation)
2. Create a function to send emails when new applications are submitted

### Storage Setup

For resume uploads:

1. Go to Storage in your Supabase dashboard
2. Create a new bucket named "resumes"
3. Configure access policies (these are also defined in schema.sql)

## Support

If you encounter any issues, please check:
1. Supabase logs in your dashboard
2. Application console logs
3. Network requests in browser developer tools 