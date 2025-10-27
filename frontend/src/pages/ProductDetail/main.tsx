import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductDetail } from '@/domain/product/hooks/useProductDetail';
import { ProductImageCarousel } from '@/domain/product/components/ProductImageCarousel';
import { QuantitySelector } from '@/domain/product/components/QuantitySelector';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { ErrorMessage } from '@/core/components/ErrorMessage';
import { formatCurrency } from '@/core/utils/format';

/**
 * @page ProductDetailPage
 * @summary Product detail page with images, description, and quantity selection
 * @domain product
 * @type detail-page
 * @category product-management
 */
export const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(100);

  const { product, isLoading, error } = useProductDetail({
    productId: id!,
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <ErrorMessage
        title="Produto não encontrado"
        message="O produto que você está procurando não existe ou não está mais disponível."
        onBack={() => navigate('/catalog')}
      />
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/catalog')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar ao catálogo
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div>
              <ProductImageCarousel images={product.images} productName={product.name} />
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                {!product.available && (
                  <span className="inline-block bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded">
                    Produto Indisponível
                  </span>
                )}
              </div>

              <div className="border-t border-b border-gray-200 py-4">
                <p className="text-3xl font-bold text-primary-600">
                  {formatCurrency(product.price)}
                </p>
                <p className="text-sm text-gray-500 mt-1">Preço unitário</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Descrição</h2>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">Ingredientes</h2>
                <p className="text-gray-700 leading-relaxed">{product.ingredients}</p>
              </div>

              {product.available && (
                <div className="border-t border-gray-200 pt-6 space-y-4">
                  <QuantitySelector
                    quantity={quantity}
                    onQuantityChange={setQuantity}
                    minQuantity={100}
                    maxQuantity={10000}
                    step={100}
                  />

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Quantidade:</span>
                      <span className="font-semibold">{quantity} unidades</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Valor Total:</span>
                      <span className="text-2xl font-bold text-primary-600">
                        {formatCurrency(totalPrice)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
                    Adicionar ao Pedido
                  </button>
                </div>
              )}

              {!product.available && (
                <div className="border-t border-gray-200 pt-6">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                    <p className="text-red-800 font-medium">
                      Este produto está temporariamente indisponível
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
