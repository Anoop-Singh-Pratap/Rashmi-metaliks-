import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  // Placeholder for future authentication logic
  console.log('Authentication middleware called, but no action taken (Supabase removed).');
  next();
}; 