import type { Product } from '../../types';

export interface UseProductListOptions {
  page?: number;
  pageSize?: number;
  enabled?: boolean;
}

export interface UseProductListReturn {
  products: Product[];
  isLoading: boolean;
  error: Error | null;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  refetch: () => void;
}
