import type { Product } from '../../types';

export interface UseProductSearchOptions {
  searchTerm: string;
  page?: number;
  pageSize?: number;
  enabled?: boolean;
}

export interface UseProductSearchReturn {
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
