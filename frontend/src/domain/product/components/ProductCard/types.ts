import type { Product } from '../../types';

export interface ProductCardProps {
  product: Product;
  onSelect?: (productId: string) => void;
}
