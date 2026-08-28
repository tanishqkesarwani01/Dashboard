import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { ENV } from './config/env.js';
import { apiRouter } from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  // Security & Middleware
  app.use(helmet());
  app.use(
    cors({
      origin: [ENV.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173'],
      credentials: true,
    })
  );
  app.use(express.json({ limit: '10mb' }));
  app.use(morgan('dev'));

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      name: 'CareerOS API Server',
      version: '1.0.0',
      status: 'active',
      endpoints: {
        health: '/api/health',
      },
    });
  });

  // API Routes
  app.use('/api', apiRouter);

  // Global Error Handler
  app.use(errorHandler);

  return app;
}
