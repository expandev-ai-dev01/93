import type { Product } from '../../types';

export interface UseProductDetailOptions {
  productId: string;
  enabled?: boolean;
}

export interface UseProductDetailReturn {
  product: Product | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}
