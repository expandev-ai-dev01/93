import { v4 as uuidv4 } from 'uuid';
import {
  ProductEntity,
  ProductListItem,
  ProductDetail,
  ProductSearchParams,
  ProductCreateRequest,
  ProductUpdateRequest,
} from './productTypes';

/**
 * @summary
 * In-memory product storage and business logic
 *
 * @module services/product
 *
 * @description
 * Manages product data in memory without database persistence.
 * Implements all CRUD operations and search functionality.
 */

// In-memory storage with initial products
const products: ProductEntity[] = [
  {
    id: uuidv4(),
    name: 'Brigadeiro Gourmet',
    description:
      'Delicioso brigadeiro artesanal feito com chocolate belga de alta qualidade. Perfeito para festas e eventos especiais.',
    ingredients: 'Leite condensado, chocolate belga, manteiga, granulado premium',
    price: 2.5,
    images: [
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80',
      'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=800&q=80',
    ],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Beijinho de Coco',
    description:
      'Tradicional beijinho brasileiro com cobertura de coco ralado. Sabor suave e textura cremosa que derrete na boca.',
    ingredients: 'Leite condensado, coco ralado, manteiga, cravo da índia',
    price: 2.0,
    images: [
      'https://images.unsplash.com/photo-1558326567-98ae2405596b?w=800&q=80',
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80',
    ],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: uuidv4(),
    name: 'Cajuzinho Premium',
    description:
      'Docinho em formato de caju feito com amendoim torrado e chocolate ao leite. Uma combinação irresistível de sabores.',
    ingredients: 'Amendoim torrado, leite condensado, chocolate ao leite, açúcar',
    price: 2.8,
    images: [
      'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=800&q=80',
      'https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=800&q=80',
    ],
    available: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/**
 * @summary
 * Lists all available products with pagination
 *
 * @function productList
 * @module services/product
 *
 * @param {number} [page=1] - Page number
 * @param {number} [pageSize=12] - Items per page
 *
 * @returns {Promise<{ data: ProductListItem[]; total: number; page: number; pageSize: number }>}
 *
 * @example
 * const result = await productList(1, 12);
 */
export async function productList(
  page: number = 1,
  pageSize: number = 12
): Promise<{ data: ProductListItem[]; total: number; page: number; pageSize: number }> {
  // Filter only available products with images
  const availableProducts = products.filter((p) => p.available && p.images && p.images.length > 0);

  // Sort alphabetically by name
  const sortedProducts = availableProducts.sort((a, b) => a.name.localeCompare(b.name));

  // Calculate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Map to list items
  const data: ProductListItem[] = paginatedProducts.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description.substring(0, 100) + (p.description.length > 100 ? '...' : ''),
    price: p.price,
    mainImage: p.images[0],
    available: p.available,
  }));

  return {
    data,
    total: sortedProducts.length,
    page,
    pageSize,
  };
}

/**
 * @summary
 * Gets detailed information about a specific product
 *
 * @function productGet
 * @module services/product
 *
 * @param {string} id - Product identifier
 *
 * @returns {Promise<ProductDetail | null>}
 *
 * @throws {Error} When product not found
 *
 * @example
 * const product = await productGet('uuid-here');
 */
export async function productGet(id: string): Promise<ProductDetail | null> {
  const product = products.find((p) => p.id === id);

  if (!product) {
    return null;
  }

  return {
    id: product.id,
    name: product.name,
    description: product.description,
    ingredients: product.ingredients,
    price: product.price,
    images: product.images,
    available: product.available,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

/**
 * @summary
 * Searches products by term in name, description, and ingredients
 *
 * @function productSearch
 * @module services/product
 *
 * @param {ProductSearchParams} params - Search parameters
 *
 * @returns {Promise<{ data: ProductListItem[]; total: number; page: number; pageSize: number }>}
 *
 * @example
 * const results = await productSearch({ searchTerm: 'chocolate', page: 1 });
 */
export async function productSearch(
  params: ProductSearchParams
): Promise<{ data: ProductListItem[]; total: number; page: number; pageSize: number }> {
  const { searchTerm = '', page = 1, pageSize = 12 } = params;

  // Normalize search term (lowercase, remove accents)
  const normalizedTerm = searchTerm
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (!p.available || !p.images || p.images.length === 0) {
      return false;
    }

    const searchableText = `${p.name} ${p.description} ${p.ingredients}`
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    return searchableText.includes(normalizedTerm);
  });

  // Sort by relevance (name matches first, then description, then ingredients)
  const sortedProducts = filteredProducts.sort((a, b) => {
    const aName = a.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const bName = b.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const aNameMatch = aName.includes(normalizedTerm);
    const bNameMatch = bName.includes(normalizedTerm);

    if (aNameMatch && !bNameMatch) return -1;
    if (!aNameMatch && bNameMatch) return 1;

    return a.name.localeCompare(b.name);
  });

  // Calculate pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Map to list items
  const data: ProductListItem[] = paginatedProducts.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description.substring(0, 100) + (p.description.length > 100 ? '...' : ''),
    price: p.price,
    mainImage: p.images[0],
    available: p.available,
  }));

  return {
    data,
    total: sortedProducts.length,
    page,
    pageSize,
  };
}

/**
 * @summary
 * Creates a new product (admin only)
 *
 * @function productCreate
 * @module services/product
 *
 * @param {ProductCreateRequest} data - Product data
 *
 * @returns {Promise<ProductEntity>}
 *
 * @example
 * const product = await productCreate({ name: 'Brigadeiro', ... });
 */
export async function productCreate(data: ProductCreateRequest): Promise<ProductEntity> {
  const now = new Date();

  const product: ProductEntity = {
    id: uuidv4(),
    name: data.name,
    description: data.description,
    ingredients: data.ingredients,
    price: data.price,
    images: data.images,
    available: data.available,
    createdAt: now,
    updatedAt: now,
  };

  products.push(product);

  return product;
}

/**
 * @summary
 * Updates an existing product (admin only)
 *
 * @function productUpdate
 * @module services/product
 *
 * @param {string} id - Product identifier
 * @param {ProductUpdateRequest} data - Updated product data
 *
 * @returns {Promise<ProductEntity | null>}
 *
 * @example
 * const updated = await productUpdate('uuid', { price: 2.50 });
 */
export async function productUpdate(
  id: string,
  data: ProductUpdateRequest
): Promise<ProductEntity | null> {
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return null;
  }

  const product = products[index];

  products[index] = {
    ...product,
    ...data,
    updatedAt: new Date(),
  };

  return products[index];
}

/**
 * @summary
 * Deletes a product (soft delete - sets available to false)
 *
 * @function productDelete
 * @module services/product
 *
 * @param {string} id - Product identifier
 *
 * @returns {Promise<boolean>}
 *
 * @example
 * const deleted = await productDelete('uuid');
 */
export async function productDelete(id: string): Promise<boolean> {
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return false;
  }

  products[index].available = false;
  products[index].updatedAt = new Date();

  return true;
}
