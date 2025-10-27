import { useQuery } from '@tanstack/react-query';
import { productService } from '../../services/productService';
import type { UseProductDetailOptions, UseProductDetailReturn } from './types';

/**
 * @hook useProductDetail
 * @summary Manages single product detail with caching
 * @domain product
 * @type domain-hook
 * @category data
 */
export const useProductDetail = (options: UseProductDetailOptions): UseProductDetailReturn => {
  const { productId, enabled = true } = options;

  const queryKey = ['products', 'detail', productId];

  const { data, isLoading, error, refetch } = useQuery({
    queryKey,
    queryFn: () => productService.getById(productId),
    enabled: enabled && !!productId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    product: data || null,
    isLoading,
    error: error as Error | null,
    refetch,
  };
};
