/**
 * @interface SuccessResponse
 * @description Standard success response structure
 *
 * @property {boolean} success - Always true for success
 * @property {T} data - Response data
 * @property {Object} [metadata] - Optional metadata
 * @property {number} [metadata.page] - Current page number
 * @property {number} [metadata.pageSize] - Items per page
 * @property {number} [metadata.total] - Total items count
 * @property {string} metadata.timestamp - Response timestamp
 */
export interface SuccessResponse<T> {
  success: true;
  data: T;
  metadata?: {
    page?: number;
    pageSize?: number;
    total?: number;
    timestamp: string;
  };
}

/**
 * @summary
 * Creates a standardized success response
 *
 * @function successResponse
 * @module utils/response
 *
 * @param {T} data - Response data
 * @param {Object} [metadata] - Optional metadata
 *
 * @returns {SuccessResponse<T>} Formatted success response
 *
 * @example
 * const response = successResponse({ id: 1, name: 'Product' });
 * // Returns: { success: true, data: { id: 1, name: 'Product' }, metadata: { timestamp: '...' } }
 */
export function successResponse<T>(
  data: T,
  metadata?: Partial<SuccessResponse<T>['metadata']>
): SuccessResponse<T> {
  return {
    success: true,
    data,
    metadata: {
      ...metadata,
      timestamp: new Date().toISOString(),
    },
  };
}
