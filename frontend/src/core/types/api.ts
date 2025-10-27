/**
 * @type ApiResponse
 * @summary Standard API response wrapper
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * @type ApiError
 * @summary Standard API error response
 */
export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * @type PaginatedResponse
 * @summary Paginated API response
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
