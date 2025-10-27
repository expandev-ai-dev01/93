import { formatCurrency } from '@/core/utils/format';
import type { ProductCardProps } from './types';

/**
 * @component ProductCard
 * @summary Product card display component for catalog listing
 * @domain product
 * @type domain-component
 * @category display
 */
export const ProductCard = ({ product, onSelect }: ProductCardProps) => {
  const handleClick = () => {
    if (onSelect) {
      onSelect(product.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 hover:shadow-lg"
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-600">
            {formatCurrency(product.price)}
          </span>
          {!product.available && (
            <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
              Indisponível
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
