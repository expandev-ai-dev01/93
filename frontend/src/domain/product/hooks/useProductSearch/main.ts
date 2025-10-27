import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { productService } from '../../services/productService';
import type { UseProductSearchOptions, UseProductSearchReturn } from './types';

/**
 * @hook useProductSearch
 * @summary Manages product search with pagination and caching
 * @domain product
 * @type domain-hook
 * @category data
 */
export const useProductSearch = (options: UseProductSearchOptions): UseProductSearchReturn => {
  const { searchTerm, page = 1, pageSize = 12, enabled = true } = options;

  const queryKey = ['products', 'search', { searchTerm, page, pageSize }];

  const shouldSearch = enabled && searchTerm.length >= 3;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => productService.search({ searchTerm, page, pageSize }),
    enabled: shouldSearch,
    staleTime: 2 * 60 * 1000,
  });

  const totalPages = useMemo(() => {
    if (!data) return 0;
    return Math.ceil(data.total / data.pageSize);
  }, [data]);

  const hasNextPage = useMemo(() => {
    if (!data) return false;
    return data.page < totalPages;
  }, [data, totalPages]);

  const hasPreviousPage = useMemo(() => {
    if (!data) return false;
    return data.page > 1;
  }, [data]);

  return {
    products: data?.data || [],
    isLoading,
    error: error as Error | null,
    page: data?.page || page,
    pageSize: data?.pageSize || pageSize,
    total: data?.total || 0,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    refetch,
  };
};
