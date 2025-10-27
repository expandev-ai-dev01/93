import { Request, Response, NextFunction } from 'express';

/**
 * @interface ErrorResponse
 * @description Standard error response structure
 *
 * @property {boolean} success - Always false for errors
 * @property {Object} error - Error details
 * @property {string} error.code - Error code
 * @property {string} error.message - Error message
 * @property {any} [error.details] - Additional error details
 * @property {string} timestamp - Error timestamp
 */
interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * @summary
 * Global error handling middleware
 *
 * @function errorMiddleware
 * @module middleware
 *
 * @param {Error} err - Error object
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function
 *
 * @description
 * Catches and processes all errors in the application.
 * Formats errors into a consistent response structure.
 */
export function errorMiddleware(err: any, req: Request, res: Response, next: NextFunction): void {
  const statusCode = err.statusCode || 500;
  const errorCode = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred';

  const errorResponse: ErrorResponse = {
    success: false,
    error: {
      code: errorCode,
      message: message,
      ...(err.details && { details: err.details }),
    },
    timestamp: new Date().toISOString(),
  };

  // Log error in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error:', {
      code: errorCode,
      message: message,
      stack: err.stack,
      path: req.path,
      method: req.method,
    });
  }

  res.status(statusCode).json(errorResponse);
}
