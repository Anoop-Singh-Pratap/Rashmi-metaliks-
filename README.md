# Rashmi Metaliks Website

This is the official website for Rashmi Metaliks, featuring a secure architecture with a separate frontend and backend.

## Project Overview

The website consists of two main components:
- **Frontend**: React application built with React, Tailwind CSS, shadcn/ui, and Supabase for client-side operations
- **Backend**: Node.js API for secure server-side operations, handling authenticated requests to Supabase and CMS

## Security Features

This project implements several security best practices:
- Environment variables for sensitive credentials (no hardcoded API keys)
- Backend with secure service role keys for privileged operations
- Authentication middleware for protected CMS operations
- Input validation on both client and server
- CORS configuration to restrict access

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn
- Supabase account with appropriate tables set up
- CMS (if using Strapi) with configured API

### Installation

1. Clone the repository
2. Install dependencies for both frontend and backend:
   ```
   npm run install:all
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update with your Supabase credentials

### Development

Run both frontend and backend concurrently:
```
npm run dev
```

Or run them separately:
```
npm run frontend
npm run backend
```

### Building for Production

Build both frontend and backend:
```
npm run build
```

## Architecture

### Frontend

The React frontend is structured as follows:
- `/src/components`: UI components
- `/src/pages`: Page components for routing
- `/src/services`: Service modules for API interaction
- `/src/lib`: Utility and configuration modules
- `/src/hooks`: Custom React hooks

### Backend

The Node.js backend follows a structured approach:
- `/src/controllers`: Request handlers
- `/src/routes`: API route definitions
- `/src/middleware`: Express middleware (authentication, etc.)
- `/src/config`: Configuration files (Supabase, etc.)
- `/src/utils`: Utility functions

## API Endpoints

### Jobs API
- `GET /api/jobs`: Get all active job listings
- `GET /api/jobs/:id`: Get a specific job listing by ID

### Applications API
- `POST /api/applications`: Submit a job application

### CMS API (News)
- `GET /api/news`: Get all news articles
- `POST /api/news`: Create a news article (requires authentication)
- `PUT /api/news/:id`: Update a news article (requires authentication)

## SEO Optimizations

The website includes several SEO optimizations:
- Schema.org structured data for rich search results
- Semantic HTML5 elements
- Responsive images
- Meta tags and descriptions
- Sitemap XML generation 