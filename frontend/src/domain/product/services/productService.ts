import { publicClient, authenticatedClient } from '@/core/lib/api';
import type {
  Product,
  ProductListParams,
  ProductSearchParams,
  CreateProductDto,
  UpdateProductDto,
} from '../types';

/**
 * @service productService
 * @summary Product management service for all product-related backend operations
 * @domain product
 * @type rest-service
 * @category product-management
 */
export const productService = {
  /**
   * @endpoint GET /api/v1/external/product
   * @summary Fetches paginated list of available products
   */
  async list(
    params: ProductListParams = {}
  ): Promise<{ data: Product[]; total: number; page: number; pageSize: number }> {
    const response = await publicClient.get('/product', { params });
    return {
      data: response.data.data,
      total: response.data.metadata.total,
      page: response.data.metadata.page,
      pageSize: response.data.metadata.pageSize,
    };
  },

  /**
   * @endpoint GET /api/v1/external/product/:id
   * @summary Fetches single product by ID
   */
  async getById(id: string): Promise<Product> {
    const response = await publicClient.get(`/product/${id}`);
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/external/product/search
   * @summary Searches products by term in name, description, and ingredients
   */
  async search(
    params: ProductSearchParams
  ): Promise<{ data: Product[]; total: number; page: number; pageSize: number }> {
    const response = await publicClient.get('/product/search', {
      params: {
        q: params.searchTerm,
        page: params.page,
        pageSize: params.pageSize,
      },
    });
    return {
      data: response.data.data,
      total: response.data.metadata.total,
      page: response.data.metadata.page,
      pageSize: response.data.metadata.pageSize,
    };
  },

  /**
   * @endpoint POST /api/v1/internal/product
   * @summary Creates new product (admin only)
   */
  async create(data: CreateProductDto): Promise<Product> {
    const response = await authenticatedClient.post('/product', data);
    return response.data.data;
  },

  /**
   * @endpoint PUT /api/v1/internal/product/:id
   * @summary Updates existing product (admin only)
   */
  async update(id: string, data: UpdateProductDto): Promise<Product> {
    const response = await authenticatedClient.put(`/product/${id}`, data);
    return response.data.data;
  },

  /**
   * @endpoint DELETE /api/v1/internal/product/:id
   * @summary Deletes product (soft delete - admin only)
   */
  async delete(id: string): Promise<void> {
    await authenticatedClient.delete(`/product/${id}`);
  },
};
