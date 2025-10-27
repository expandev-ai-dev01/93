import type { QuantitySelectorProps } from './types';

/**
 * @component QuantitySelector
 * @summary Quantity selector with increment/decrement controls
 * @domain product
 * @type domain-component
 * @category form
 */
export const QuantitySelector = ({
  quantity,
  onQuantityChange,
  minQuantity = 100,
  maxQuantity = 10000,
  step = 100,
  disabled = false,
}: QuantitySelectorProps) => {
  const handleDecrement = () => {
    const newQuantity = quantity - step;
    if (newQuantity >= minQuantity) {
      onQuantityChange(newQuantity);
    }
  };

  const handleIncrement = () => {
    const newQuantity = quantity + step;
    if (newQuantity <= maxQuantity) {
      onQuantityChange(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= minQuantity && value <= maxQuantity && value % step === 0) {
      onQuantityChange(value);
    }
  };

  const canDecrement = quantity > minQuantity;
  const canIncrement = quantity < maxQuantity;

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">Quantidade (unidades)</label>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || !canDecrement}
          className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg transition-colors"
          aria-label="Diminuir quantidade"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          disabled={disabled}
          min={minQuantity}
          max={maxQuantity}
          step={step}
          className="w-24 text-center px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled || !canIncrement}
          className="w-10 h-10 flex items-center justify-center bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 disabled:cursor-not-allowed rounded-lg transition-colors"
          aria-label="Aumentar quantidade"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
      <p className="text-xs text-gray-500">
        Mínimo: {minQuantity} | Máximo: {maxQuantity} | Incrementos de {step}
      </p>
    </div>
  );
};
