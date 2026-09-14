import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { createServer as createViteServer } from 'vite';
import { connectDB } from './src/server/db/connection.ts';
import apiRouter from './src/server/routes/apiRouter.ts';
import { rateLimiter } from './src/server/middleware/rateLimiter.ts';
import { errorHandler } from './src/server/middleware/errorHandler.ts';

const PORT = 3000;
const HOST = '0.0.0.0';

async function startServer() {
  const app = express();

  // Attempt database connection
  await connectDB();

  // API Gateway & Security Middleware
  app.use(
    helmet({
      contentSecurityPolicy: false, // Allows Vite dev scripts and dynamic nissan.in CDN images
      crossOriginEmbedderPolicy: false,
    })
  );

  app.use(cors({
    origin: true,
    credentials: true,
  }));

  app.use(morgan('dev'));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // Global API Rate Limiter
  app.use('/api', rateLimiter(300, 60 * 1000));

  // Health endpoint alias for reverse proxy checks
  app.get('/api/health', (_req, res) => {
    res.json({
      status: 'ok',
      service: 'Tara Nissan Web App & RESTful API Gateway',
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString(),
    });
  });

  // Mount API v1 Routes
  app.use('/api/v1', apiRouter);

  // Alias /api to /api/v1 for convenience
  app.use('/api', apiRouter);

  // Centralized Error Handling Middleware for API routes
  app.use('/api', errorHandler);

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    // Ensure Vite HMR client does not attempt WebSocket connection in container sandbox
    try {
      const clientPath = path.resolve(process.cwd(), 'node_modules/vite/dist/client/client.mjs');
      if (fs.existsSync(clientPath)) {
        let content = fs.readFileSync(clientPath, 'utf-8');
        if (content.includes('await wsTransport.connect(handlers);')) {
          content = content.replace(
            'await wsTransport.connect(handlers);',
            'return; /* HMR disabled in sandbox */'
          );
          fs.writeFileSync(clientPath, content, 'utf-8');
        }
      }
    } catch {
      // Ignore in read-only environments
    }

    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, HOST, () => {
    console.log(`[Tara Nissan Server] Full-stack application online on http://${HOST}:${PORT}`);
    console.log(`[Tara Nissan Server] REST API available at http://${HOST}:${PORT}/api/v1/`);
  });
}

startServer().catch((err) => {
  console.error('[Tara Nissan Server] Failed to start server:', err);
});
