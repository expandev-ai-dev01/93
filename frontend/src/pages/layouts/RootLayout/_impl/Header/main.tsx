import { Link } from 'react-router-dom';

/**
 * @component Header
 * @summary Main application header with navigation
 * @domain core
 * @type layout-component
 * @category navigation
 */
export const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">Sweetify</span>
          </Link>
          <div className="flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
              Home
            </Link>
            <Link to="/catalog" className="text-gray-700 hover:text-primary-600 transition-colors">
              Catálogo
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors">
              Sobre
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};
