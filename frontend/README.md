

## Project info

**URL**: https://lovable.dev/projects/d5e9e2f2-6747-4068-bfcf-eaa8546f0d88

## How can I edit this code?


If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Supabase Setup

The application uses Supabase for backend services. To set up the database tables:

1. Navigate to your Supabase project dashboard
2. Go to the SQL editor
3. Either:
   - Run the SQL code in `supabase/schema.sql` to create all tables at once
   - Or run the migration file in `supabase/migrations/20240727_job_listings.sql` to create just the job listings table

### Fixing Common Errors

#### "relation "public.job_listings" does not exist" Error

If you see this error in the console, it means the job_listings table hasn't been created in your Supabase database:

1. Go to your Supabase SQL editor
2. Copy the contents of `supabase/migrations/20240727_job_listings.sql`
3. Paste and execute the SQL in the editor
4. Refresh your application


