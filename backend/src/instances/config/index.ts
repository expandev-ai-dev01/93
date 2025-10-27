import dotenv from 'dotenv';

dotenv.config();

/**
 * @summary
 * Application configuration management
 *
 * @module config
 *
 * @description
 * Centralizes all environment-based configuration for the application.
 * Provides type-safe access to configuration values with sensible defaults.
 */
export const config = {
  server: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '3000', 10),
  },
  api: {
    version: process.env.API_VERSION || 'v1',
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? process.env.CORS_ORIGINS?.split(',') || []
          : ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposedHeaders: ['X-Total-Count', 'X-Page-Count'],
      maxAge: 86400,
    },
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL || '3600', 10),
    checkPeriod: parseInt(process.env.CACHE_CHECK_PERIOD || '600', 10),
  },
};
