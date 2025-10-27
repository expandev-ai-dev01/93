/**
 * @interface ErrorResponse
 * @description Standard error response structure
 *
 * @property {boolean} success - Always false for errors
 * @property {Object} error - Error details
 * @property {string} error.code - Error code
 * @property {string} error.message - Error message
 * @property {any} [error.details] - Additional error details
 * @property {string} timestamp - Error timestamp
 */
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
}

/**
 * @summary
 * Creates a standardized error response
 *
 * @function errorResponse
 * @module utils/response
 *
 * @param {string} message - Error message
 * @param {string} [code='ERROR'] - Error code
 * @param {any} [details] - Additional error details
 *
 * @returns {ErrorResponse} Formatted error response
 *
 * @example
 * const response = errorResponse('Product not found', 'NOT_FOUND');
 * // Returns: { success: false, error: { code: 'NOT_FOUND', message: '...' }, timestamp: '...' }
 */
export function errorResponse(
  message: string,
  code: string = 'ERROR',
  details?: any
): ErrorResponse {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
    },
    timestamp: new Date().toISOString(),
  };
}
