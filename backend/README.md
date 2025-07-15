# Rashmi Metaliks Backend API

This is the backend API for the Rashmi Metaliks website, providing secure endpoints for job listings, job applications, and CMS operations.

## Features

- Secure job listings and application processing
- Protected CMS operations with authentication
- Input validation and error handling
- Environment-based configuration
- Supabase integration using service role for enhanced security

## Prerequisites

- Node.js 16+ and npm/yarn
- Supabase account with appropriate tables set up
- CMS (if using Strapi) with configured API

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   cd backend
   npm install
   ```
3. Create a `.env` file based on `.env.example`:
   ```
   cp .env.example .env
   ```
4. Update the `.env` file with your Supabase service role key and other configuration.

## Environment Variables

- `PORT`: The port for the server to listen on (default: 3000)
- `NODE_ENV`: The environment (development, production)
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_KEY`: Your Supabase service role key (keep this secret!)
- `CMS_API_URL`: Your CMS API URL (e.g., Strapi)
- `CMS_API_TOKEN`: Authentication token for CMS API
- `CORS_ORIGIN`: Allowed origins for CORS

## Development

Start the development server:

```
npm run dev
```

## Building for Production

Build the TypeScript files:

```
npm run build
```

Start the production server:

```
npm start
```

## API Endpoints

### Jobs

- `GET /api/jobs`: Get all active job listings
- `GET /api/jobs/:id`: Get a specific job listing by ID

### Applications

- `POST /api/applications`: Submit a job application

### CMS (News)

- `GET /api/news`: Get all news articles
- `POST /api/news`: Create a news article (requires authentication)
- `PUT /api/news/:id`: Update a news article (requires authentication)

## Security

This API uses several security measures:

1. Environment variables for sensitive credentials
2. Supabase service role key for secure backend operations
3. Input validation with Joi
4. Authentication middleware for protected routes
5. CORS configuration to restrict access

## Error Handling

The API includes comprehensive error handling for:

- Invalid input data
- Authentication failures
- Database errors
- External API issues 