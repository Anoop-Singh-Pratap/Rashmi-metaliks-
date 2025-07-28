import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { jobRoutes } from './routes/jobRoutes';
import { applicationRoutes } from './routes/applicationRoutes';
import { cmsRoutes } from './routes/cmsRoutes';
import { contactRoutes } from './routes/contactRoutes';
import { vendorRoutes } from './routes/vendorRoutes';
// import { testEmailRoutes } from './routes/testEmailRoutes'; // Temporarily disabled
import { securityMiddleware, sanitizeInput, securityLogger } from './middleware/security';

// Load environment variables
dotenv.config();

// Set default values for critical environment variables if not provided
if (!process.env.CMS_API_URL) {
  console.log('Setting default CMS API URL to localhost:1337');
  process.env.CMS_API_URL = 'http://localhost:1337';
}

// Validate required environment variables
const requiredEnvVars = ['CMS_API_TOKEN'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error('❌ Missing required environment variables:', missingEnvVars.join(', '));
  console.error('Please check your .env file and ensure all required variables are set.');

  // In development, provide helpful guidance
  if (process.env.NODE_ENV !== 'production') {
    console.error('💡 For development setup:');
    console.error('1. Copy backend/.env.example to backend/.env');
    console.error('2. Update the CMS_API_TOKEN with your actual Strapi API token');
    console.error('3. Restart the server');
  }

  // Don't exit in production to allow graceful degradation
  if (process.env.NODE_ENV === 'production') {
    console.warn('⚠️ Running with missing environment variables - some features may not work');
  } else {
    process.exit(1);
  }
}

// Log token status (safely, without exposing the actual token)
if (process.env.CMS_API_TOKEN) {
  console.log('✅ CMS API token is configured');
} else {
  console.warn('⚠️ CMS API token is not configured - CMS features will be disabled');
}

// Log information about Strapi API endpoints
console.log('Attempting to connect to Strapi at:', process.env.CMS_API_URL);
console.log('Collections we are looking for:');
console.log('- News API ID:', process.env.CMS_NEWS_API_ID);
console.log('- News Panel API ID:', process.env.CMS_NEWS_PANEL_API_ID);

if (!process.env.CMS_NEWS_API_ID) {
  process.env.CMS_NEWS_API_ID = 'news-and-updates';
}

if (!process.env.CMS_NEWS_PANEL_API_ID) {
  process.env.CMS_NEWS_PANEL_API_ID = 'news-and-updates-panel';
}

// Debug environment variables (safely, without exposing sensitive data)
console.log('🔧 Environment configuration:');
console.log('PORT:', process.env.PORT || '3001 (default)');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development (default)');
console.log('CMS_API_URL:', process.env.CMS_API_URL || 'http://localhost:1337 (default)');
console.log('CMS_API_TOKEN:', process.env.CMS_API_TOKEN ? '✅ Configured' : '❌ Not set');
console.log('CMS_NEWS_API_ID:', process.env.CMS_NEWS_API_ID);
console.log('CMS_NEWS_PANEL_API_ID:', process.env.CMS_NEWS_PANEL_API_ID);
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN || 'http://localhost:8080 (default)');

const app = express();
const port = parseInt(process.env.PORT || '3001', 10);

// Enable 'trust proxy' to correctly handle secure cookies and redirects
// behind a reverse proxy like the one we've configured in .htaccess.
app.set('trust proxy', 1);

// Enhanced Security Headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      scriptSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow embedding for CMS integration
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
}));
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  credentials: true
}));

// Rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs for sensitive endpoints
  message: {
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// The force HTTPS redirect is necessary when behind a proxy.
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}

app.use(generalLimiter);
app.use(securityMiddleware); // Additional security headers
app.use(express.json({ limit: '10mb' })); // Parse JSON request body with size limit
app.use(sanitizeInput); // Input sanitization
app.use(securityLogger); // Security monitoring
app.use(morgan('dev')); // Logging

// Debug middleware to log requests
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes with rate limiting
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', strictLimiter, applicationRoutes);
app.use('/api/news', cmsRoutes);
app.use('/api/contact', strictLimiter, contactRoutes);
app.use('/api/vendors', strictLimiter, vendorRoutes);
// app.use('/api/test-email', testEmailRoutes); // Re-enabled for email testing

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Enhanced error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  // Log error details for debugging (server-side only)
  console.error('❌ Server error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Determine error status code
  const statusCode = (err as any).statusCode || (err as any).status || 500;
  
  // Generic error response for production
  if (process.env.NODE_ENV === 'production') {
    res.status(statusCode).json({
      success: false,
      message: statusCode === 500 ? 'Internal server error' : 'An error occurred',
      timestamp: new Date().toISOString()
    });
  } else {
    // Detailed error for development
    res.status(statusCode).json({
      success: false,
      message: err.message,
      stack: err.stack,
      timestamp: new Date().toISOString()
    });
  }
});

// Export the app for testing and potential serverless use
export default app;

// Start the server (both development and production for traditional hosting)
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server is running on port ${port}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Server accessible at: http://0.0.0.0:${port}`);

  // Log startup success
  if (process.env.NODE_ENV === 'production') {
    console.log('✅ Production server started successfully');
  } else {
    console.log('🔧 Development server started successfully');
  }
});