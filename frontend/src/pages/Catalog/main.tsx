import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductList } from '@/domain/product/hooks/useProductList';
import { useProductSearch } from '@/domain/product/hooks/useProductSearch';
import { ProductGrid } from '@/domain/product/components/ProductGrid';
import { SearchBar } from '@/domain/product/components/SearchBar';
import { Pagination } from '@/domain/product/components/Pagination';
import { ErrorMessage } from '@/core/components/ErrorMessage';

/**
 * @page CatalogPage
 * @summary Product catalog page with search and pagination
 * @domain product
 * @type list-page
 * @category product-management
 */
export const CatalogPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [listPage, setListPage] = useState(1);
  const [searchPage, setSearchPage] = useState(1);

  const {
    products: listProducts,
    isLoading: isListLoading,
    error: listError,
    totalPages: listTotalPages,
    hasNextPage: listHasNextPage,
    hasPreviousPage: listHasPreviousPage,
  } = useProductList({
    page: listPage,
    pageSize: 12,
    enabled: !isSearching,
  });

  const {
    products: searchProducts,
    isLoading: isSearchLoading,
    error: searchError,
    totalPages: searchTotalPages,
    hasNextPage: searchHasNextPage,
    hasPreviousPage: searchHasPreviousPage,
  } = useProductSearch({
    searchTerm,
    page: searchPage,
    pageSize: 12,
    enabled: isSearching && searchTerm.length >= 3,
  });

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    if (term.length === 0) {
      setIsSearching(false);
      setSearchPage(1);
    }
  };

  const handleSearch = () => {
    if (searchTerm.length >= 3) {
      setIsSearching(true);
      setSearchPage(1);
    }
  };

  const handleProductSelect = (productId: string) => {
    navigate(`/catalog/${productId}`);
  };

  const handlePageChange = (page: number) => {
    if (isSearching) {
      setSearchPage(page);
    } else {
      setListPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const products = isSearching ? searchProducts : listProducts;
  const isLoading = isSearching ? isSearchLoading : isListLoading;
  const error = isSearching ? searchError : listError;
  const currentPage = isSearching ? searchPage : listPage;
  const totalPages = isSearching ? searchTotalPages : listTotalPages;
  const hasNextPage = isSearching ? searchHasNextPage : listHasNextPage;
  const hasPreviousPage = isSearching ? searchHasPreviousPage : listHasPreviousPage;

  if (error) {
    return (
      <ErrorMessage
        title="Erro ao carregar produtos"
        message="Não foi possível carregar os produtos. Por favor, tente novamente."
        onRetry={() => window.location.reload()}
        onBack={() => navigate('/')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo de Docinhos</h1>
          <p className="text-lg text-gray-600 mb-6">
            Explore nossa seleção de docinhos artesanais deliciosos
          </p>
          <div className="max-w-2xl">
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              onSearch={handleSearch}
              placeholder="Buscar por nome, descrição ou ingredientes..."
            />
          </div>
        </div>

        {isSearching && searchTerm.length >= 3 && (
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              {products.length > 0
                ? `${products.length} resultado(s) encontrado(s) para "${searchTerm}"`
                : `Nenhum resultado encontrado para "${searchTerm}"`}
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setIsSearching(false);
                setSearchPage(1);
              }}
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              Limpar busca
            </button>
          </div>
        )}

        <ProductGrid
          products={products}
          isLoading={isLoading}
          onProductSelect={handleProductSelect}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}
        />
      </div>
    </div>
  );
};

export default CatalogPage;
