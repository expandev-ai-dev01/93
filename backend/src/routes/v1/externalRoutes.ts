import { Router } from 'express';
import * as productController from '@/api/v1/external/product/controller';

const router = Router();

/**
 * @summary
 * External (public) API routes configuration
 *
 * @module routes/v1/externalRoutes
 *
 * @description
 * Configures all public API endpoints that do not require authentication.
 * These routes are accessible without credentials.
 */

// Product routes - /api/v1/external/product
router.get('/product', productController.listHandler);
router.get('/product/search', productController.searchHandler);
router.get('/product/:id', productController.getHandler);

export default router;
