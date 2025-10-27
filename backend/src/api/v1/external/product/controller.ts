import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants/http';
import { productList, productGet, productSearch } from '@/services/product';
import { zId, zString } from '@/utils/validation';

/**
 * @api {get} /external/product List Products
 * @apiName ListProducts
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Lists all available products with pagination
 *
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=12] Items per page
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object[]} data Product list
 * @apiSuccess {Object} metadata Pagination metadata
 *
 * @apiError {String} ValidationError Invalid parameters
 */
export async function listHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const querySchema = z.object({
      page: z.coerce.number().int().positive().optional().default(1),
      pageSize: z.coerce.number().int().positive().max(100).optional().default(12),
    });

    const validated = querySchema.parse(req.query);

    const result = await productList(validated.page, validated.pageSize);

    res.json(
      successResponse(result.data, {
        page: result.page,
        pageSize: result.pageSize,
        total: result.total,
      })
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Parâmetros inválidos', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /external/product/:id Get Product Details
 * @apiName GetProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Gets detailed information about a specific product
 *
 * @apiParam {String} id Product identifier
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Product details
 *
 * @apiError {String} NotFound Product not found
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: zString,
    });

    const validated = paramsSchema.parse(req.params);

    const product = await productGet(validated.id);

    if (!product) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Produto não encontrado', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(product));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Parâmetros inválidos', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /external/product/search Search Products
 * @apiName SearchProducts
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Searches products by term in name, description, and ingredients
 *
 * @apiParam {String} q Search term (minimum 3 characters)
 * @apiParam {Number} [page=1] Page number
 * @apiParam {Number} [pageSize=12] Items per page
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object[]} data Search results
 * @apiSuccess {Object} metadata Pagination metadata
 *
 * @apiError {String} ValidationError Search term too short
 */
export async function searchHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const querySchema = z.object({
      q: z.string().min(3, 'Digite pelo menos 3 caracteres para realizar a busca').max(50),
      page: z.coerce.number().int().positive().optional().default(1),
      pageSize: z.coerce.number().int().positive().max(100).optional().default(12),
    });

    const validated = querySchema.parse(req.query);

    const result = await productSearch({
      searchTerm: validated.q,
      page: validated.page,
      pageSize: validated.pageSize,
    });

    if (result.total === 0) {
      res.json(
        successResponse([], {
          page: result.page,
          pageSize: result.pageSize,
          total: 0,
        })
      );
      return;
    }

    res.json(
      successResponse(result.data, {
        page: result.page,
        pageSize: result.pageSize,
        total: result.total,
      })
    );
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Parâmetros inválidos', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}
