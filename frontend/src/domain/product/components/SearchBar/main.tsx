import { useState, useEffect } from 'react';
import type { SearchBarProps } from './types';

/**
 * @component SearchBar
 * @summary Search input component with debounce
 * @domain product
 * @type domain-component
 * @category form
 */
export const SearchBar = ({
  searchTerm,
  onSearchChange,
  onSearch,
  placeholder = 'Buscar docinhos...',
  disabled = false,
}: SearchBarProps) => {
  const [localTerm, setLocalTerm] = useState(searchTerm);

  useEffect(() => {
    setLocalTerm(searchTerm);
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalTerm(value);
    onSearchChange(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localTerm.length >= 3) {
      onSearch();
    }
  };

  const handleClear = () => {
    setLocalTerm('');
    onSearchChange('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={localTerm}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {localTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Limpar busca"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
      {localTerm.length > 0 && localTerm.length < 3 && (
        <p className="text-xs text-red-600 mt-1">Digite pelo menos 3 caracteres para buscar</p>
      )}
    </form>
  );
};
