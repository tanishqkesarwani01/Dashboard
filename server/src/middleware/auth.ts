import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { ENV } from '../config/env.js';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
  };
}

const supabaseAdmin = ENV.SUPABASE_URL && ENV.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(ENV.SUPABASE_URL, ENV.SUPABASE_SERVICE_ROLE_KEY)
  : null;

export async function requireAuth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // If Supabase is not configured yet or in demo mode, allow fallback demo user
    if (!supabaseAdmin) {
      req.user = { id: 'demo-engineer-777', email: 'alex.rivera@careeros.dev' };
      return next();
    }
    return res.status(401).json({
      success: false,
      error: { message: 'Authorization header missing or invalid. Format: Bearer <token>' },
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    if (supabaseAdmin) {
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      if (error || !user) {
        return res.status(401).json({
          success: false,
          error: { message: 'Invalid or expired session token' },
        });
      }
      req.user = { id: user.id, email: user.email || '' };
    } else {
      req.user = { id: 'demo-engineer-777', email: 'alex.rivera@careeros.dev' };
    }
    next();
  } catch (err: any) {
    return res.status(401).json({
      success: false,
      error: { message: err.message || 'Authentication failed' },
    });
  }
}
