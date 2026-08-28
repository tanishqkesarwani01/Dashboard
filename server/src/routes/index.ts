import { Router } from 'express';
import { healthRouter } from './health.js';
import { aiRouter } from './ai.js';
import { analyticsRouter } from './analytics.js';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/ai', aiRouter);
apiRouter.use('/analytics', analyticsRouter);
