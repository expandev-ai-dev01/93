/**
 * @summary
 * Product domain type definitions
 *
 * @module services/product
 *
 * @description
 * Defines all TypeScript types and interfaces for the product catalog domain.
 */

/**
 * @interface ProductEntity
 * @description Represents a product entity in the system
 *
 * @property {string} id - Unique product identifier (UUID)
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {string} ingredients - Product ingredients list
 * @property {number} price - Unit price in BRL
 * @property {string[]} images - Array of image URLs
 * @property {boolean} available - Availability status
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} updatedAt - Last update timestamp
 */
export interface ProductEntity {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  images: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface ProductListItem
 * @description Product list view representation
 *
 * @property {string} id - Product identifier
 * @property {string} name - Product name
 * @property {string} description - Brief description
 * @property {number} price - Unit price
 * @property {string} mainImage - Primary image URL
 * @property {boolean} available - Availability status
 */
export interface ProductListItem {
  id: string;
  name: string;
  description: string;
  price: number;
  mainImage: string;
  available: boolean;
}

/**
 * @interface ProductDetail
 * @description Complete product details
 *
 * @property {string} id - Product identifier
 * @property {string} name - Product name
 * @property {string} description - Full description
 * @property {string} ingredients - Ingredients list
 * @property {number} price - Unit price
 * @property {string[]} images - All product images
 * @property {boolean} available - Availability status
 * @property {Date} createdAt - Creation date
 * @property {Date} updatedAt - Last update date
 */
export interface ProductDetail {
  id: string;
  name: string;
  description: string;
  ingredients: string;
  price: number;
  images: string[];
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * @interface ProductSearchParams
 * @description Search parameters for product queries
 *
 * @property {string} [searchTerm] - Search term for name/description/ingredients
 * @property {number} [page] - Page number (default: 1)
 * @property {number} [pageSize] - Items per page (default: 12)
 */
export interface ProductSearchParams {
  searchTerm?: string;
  page?: number;
  pageSize?: number;
}

/**
 * @interface ProductCreateRequest
 * @description Request payload for creating a product
 *
 * @property {string} name - Product name
 * @property {string} description - Product description
 * @property {string} ingredients - Ingredients list
 * @property {number} price - Unit price
 * @property {string[]} images - Image URLs
 * @property {boolean} available - Availability status
 */
export interface ProductCreateRequest {
  name: string;
  description: string;
  ingredients: string;
  price: number;
  images: string[];
  available: boolean;
}

/**
 * @interface ProductUpdateRequest
 * @description Request payload for updating a product
 *
 * @property {string} [name] - Product name
 * @property {string} [description] - Product description
 * @property {string} [ingredients] - Ingredients list
 * @property {number} [price] - Unit price
 * @property {string[]} [images] - Image URLs
 * @property {boolean} [available] - Availability status
 */
export interface ProductUpdateRequest {
  name?: string;
  description?: string;
  ingredients?: string;
  price?: number;
  images?: string[];
  available?: boolean;
}
