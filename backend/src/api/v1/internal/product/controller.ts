import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/utils/response';
import { HTTP_STATUS } from '@/constants/http';
import { productCreate, productUpdate, productDelete } from '@/services/product';
import { zString, zNullableString, zPositiveNumber } from '@/utils/validation';

/**
 * @api {post} /internal/product Create Product
 * @apiName CreateProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new product (admin only)
 *
 * @apiParam {String} name Product name (3-50 characters)
 * @apiParam {String} description Product description (10-500 characters)
 * @apiParam {String} ingredients Ingredients list (5-300 characters)
 * @apiParam {Number} price Unit price (0.10-50.00)
 * @apiParam {String[]} images Image URLs (1-5 images)
 * @apiParam {Boolean} [available=true] Availability status
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Created product
 *
 * @apiError {String} ValidationError Invalid parameters
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const bodySchema = z.object({
      name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres').max(50, 'Nome muito longo'),
      description: z
        .string()
        .min(10, 'Descrição deve ter no mínimo 10 caracteres')
        .max(500, 'Descrição muito longa'),
      ingredients: z
        .string()
        .min(5, 'Ingredientes devem ter no mínimo 5 caracteres')
        .max(300, 'Lista de ingredientes muito longa'),
      price: z.number().min(0.1, 'Preço mínimo é R$ 0,10').max(50, 'Preço máximo é R$ 50,00'),
      images: z
        .array(z.string().url('URL de imagem inválida'))
        .min(1, 'Pelo menos uma imagem é obrigatória')
        .max(5, 'Máximo de 5 imagens permitidas'),
      available: z.boolean().optional().default(true),
    });

    const validated = bodySchema.parse(req.body);

    const product = await productCreate(validated);

    res.status(HTTP_STATUS.CREATED).json(successResponse(product));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Dados inválidos', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {put} /internal/product/:id Update Product
 * @apiName UpdateProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Updates an existing product (admin only)
 *
 * @apiParam {String} id Product identifier
 * @apiParam {String} [name] Product name
 * @apiParam {String} [description] Product description
 * @apiParam {String} [ingredients] Ingredients list
 * @apiParam {Number} [price] Unit price
 * @apiParam {String[]} [images] Image URLs
 * @apiParam {Boolean} [available] Availability status
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Updated product
 *
 * @apiError {String} NotFound Product not found
 */
export async function putHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: zString,
    });

    const bodySchema = z.object({
      name: z.string().min(3).max(50).optional(),
      description: z.string().min(10).max(500).optional(),
      ingredients: z.string().min(5).max(300).optional(),
      price: z.number().min(0.1).max(50).optional(),
      images: z.array(z.string().url()).min(1).max(5).optional(),
      available: z.boolean().optional(),
    });

    const validatedParams = paramsSchema.parse(req.params);
    const validatedBody = bodySchema.parse(req.body);

    const product = await productUpdate(validatedParams.id, validatedBody);

    if (!product) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Produto não encontrado', 'NOT_FOUND'));
      return;
    }

    res.json(successResponse(product));
  } catch (error: any) {
    if (error.name === 'ZodError') {
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json(errorResponse('Dados inválidos', 'VALIDATION_ERROR', error.errors));
    } else {
      next(error);
    }
  }
}

/**
 * @api {delete} /internal/product/:id Delete Product
 * @apiName DeleteProduct
 * @apiGroup Product
 * @apiVersion 1.0.0
 *
 * @apiDescription Deletes a product (soft delete - sets available to false)
 *
 * @apiParam {String} id Product identifier
 *
 * @apiSuccess {Boolean} success Success status
 *
 * @apiError {String} NotFound Product not found
 */
export async function deleteHandler(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const paramsSchema = z.object({
      id: zString,
    });

    const validated = paramsSchema.parse(req.params);

    const deleted = await productDelete(validated.id);

    if (!deleted) {
      res.status(HTTP_STATUS.NOT_FOUND).json(errorResponse('Produto não encontrado', 'NOT_FOUND'));
      return;
    }

    res.status(HTTP_STATUS.NO_CONTENT).send();
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
