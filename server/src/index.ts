import { createApp } from './app.js';
import { ENV } from './config/env.js';

const app = createApp();

app.listen(ENV.PORT, () => {
  console.log(`🚀 CareerOS API Server running on port ${ENV.PORT} [${ENV.NODE_ENV}]`);
  console.log(`📡 Health check available at: http://localhost:${ENV.PORT}/api/health`);
});
