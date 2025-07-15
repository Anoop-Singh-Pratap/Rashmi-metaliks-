import { Request, Response, NextFunction } from 'express';

/**
 * Additional security middleware for enhanced protection
 */
export const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Remove server information
  res.removeHeader('X-Powered-By');
  
  // Add additional security headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Prevent clickjacking
  res.setHeader('Content-Security-Policy', "frame-ancestors 'none'");
  
  next();
};

/**
 * Input sanitization middleware
 */
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  // Basic XSS protection - remove script tags and dangerous characters
  const sanitizeString = (str: string): string => {
    if (typeof str !== 'string') return str;
    
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .replace(/[<>]/g, '');
  };
  
  const sanitizeObject = (obj: any): any => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    } else if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    } else if (obj && typeof obj === 'object') {
      const sanitized: any = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          sanitized[key] = sanitizeObject(obj[key]);
        }
      }
      return sanitized;
    }
    return obj;
  };
  
  // Sanitize request body
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }
  
  // Sanitize query parameters
  if (req.query) {
    req.query = sanitizeObject(req.query);
  }
  
  next();
};

/**
 * Request logging middleware for security monitoring
 */
export const securityLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  
  // Log suspicious patterns
  const suspiciousPatterns = [
    /\.\.\//,  // Directory traversal
    /<script/i, // XSS attempts
    /union.*select/i, // SQL injection
    /exec\(/i, // Code execution
    /eval\(/i  // Code evaluation
  ];
  
  const requestData = JSON.stringify({
    body: req.body,
    query: req.query,
    params: req.params
  });
  
  const isSuspicious = suspiciousPatterns.some(pattern => pattern.test(requestData));
  
  if (isSuspicious) {
    console.warn('🚨 Suspicious request detected:', {
      ip: req.ip,
      method: req.method,
      url: req.url,
      userAgent: req.get('User-Agent'),
      timestamp: new Date().toISOString(),
      body: req.body,
      query: req.query
    });
  }
  
  // Log response time on finish
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    if (duration > 5000) { // Log slow requests
      console.warn('⏱️ Slow request detected:', {
        method: req.method,
        url: req.url,
        duration: `${duration}ms`,
        statusCode: res.statusCode
      });
    }
  });
  
  next();
}; 