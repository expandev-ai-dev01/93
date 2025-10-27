import { Router } from 'express';
import * as productController from '@/api/v1/internal/product/controller';

const router = Router();

/**
 * @summary
 * Internal (authenticated) API routes configuration
 *
 * @module routes/v1/internalRoutes
 *
 * @description
 * Configures all authenticated API endpoints that require valid credentials.
 * These routes are protected and require authentication middleware.
 */

// Product management routes - /api/v1/internal/product
router.post('/product', productController.postHandler);
router.put('/product/:id', productController.putHandler);
router.delete('/product/:id', productController.deleteHandler);

export default router;
