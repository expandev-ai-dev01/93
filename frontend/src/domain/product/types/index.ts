/**
 * @module product/types
 * @summary Product domain type definitions
 * @domain product
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  images: string[];
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListParams {
  page?: number;
  pageSize?: number;
}

export interface ProductSearchParams {
  searchTerm: string;
  page?: number;
  pageSize?: number;
}

export interface CreateProductDto {
  name: string;
  description: string;
  ingredients: string;
  price: number;
  images: string[];
  available?: boolean;
}

export interface UpdateProductDto {
  name?: string;
  description?: string;
  ingredients?: string;
  price?: number;
  images?: string[];
  available?: boolean;
}
