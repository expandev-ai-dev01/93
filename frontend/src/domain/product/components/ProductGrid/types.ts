import type { Product } from '../../types';

export interface ProductGridProps {
  products: Product[];
  isLoading?: boolean;
  onProductSelect?: (productId: string) => void;
}
