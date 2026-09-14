import { Request, Response, NextFunction } from 'express';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(`[Error] ${req.method} ${req.originalUrl}:`, err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
      code: err.code || 'INTERNAL_ERROR',
      details: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    },
    timestamp: new Date().toISOString(),
  });
}
