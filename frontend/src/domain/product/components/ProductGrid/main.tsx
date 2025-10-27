import { ProductCard } from '../ProductCard';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { ProductGridProps } from './types';

/**
 * @component ProductGrid
 * @summary Grid layout for displaying multiple product cards
 * @domain product
 * @type domain-component
 * @category display
 */
export const ProductGrid = ({ products, isLoading, onProductSelect }: ProductGridProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onProductSelect} />
      ))}
    </div>
  );
};
