import { Request, Response, NextFunction } from 'express';
import { supabaseAdmin } from '../config/supabase';

/**
 * Middleware to authenticate requests
 * Verifies the JWT token from the Authorization header
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Check for Authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        message: 'Authentication required. Please provide a valid token.' 
      });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify the token with Supabase
    const { data, error } = await supabaseAdmin.auth.getUser(token);
    
    if (error || !data?.user) {
      return res.status(401).json({ 
        message: 'Invalid or expired token. Please authenticate again.' 
      });
    }
    
    // Add user to request for use in controllers
    req.user = data.user;
    
    // Token is valid, proceed
    next();
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(500).json({ message: 'Authentication failed due to server error' });
  }
};

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
} 