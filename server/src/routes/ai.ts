import { Router } from 'express';
import { handleAiChat } from '../controllers/aiController.js';
import { aiRateLimiter } from '../middleware/rateLimiter.js';
import { requireAuth } from '../middleware/auth.js';

export const aiRouter = Router();

aiRouter.post('/chat', aiRateLimiter, requireAuth, handleAiChat);
