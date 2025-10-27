import { z } from 'zod';

/**
 * @summary
 * Common Zod validation schemas
 *
 * @module utils/validation
 *
 * @description
 * Provides reusable Zod validation schemas for common data types.
 * All validators are applied BEFORE .nullable() or .optional() to maintain type safety.
 */

// String validators
export const zString = z.string().min(1, 'Field is required');
export const zNullableString = (maxLength?: number) => {
  let schema = z.string();
  if (maxLength) {
    schema = schema.max(maxLength);
  }
  return schema.nullable();
};

export const zName = z.string().min(1, 'Name is required').max(200, 'Name too long');
export const zDescription = z
  .string()
  .min(1, 'Description is required')
  .max(500, 'Description too long');
export const zNullableDescription = z.string().max(500, 'Description too long').nullable();

// Number validators
export const zNumber = z.number();
export const zPositiveNumber = z.number().positive('Must be positive');
export const zNonNegativeNumber = z.number().min(0, 'Must be non-negative');
export const zPrice = z.number().min(0, 'Price must be non-negative');

// ID validators
export const zId = z.coerce.number().int().positive('Invalid ID');
export const zFK = z.number().int().positive('Invalid reference ID');
export const zNullableFK = z.number().int().positive('Invalid reference ID').nullable();

// Boolean validators
export const zBit = z.boolean();
export const zNullableBit = z.boolean().nullable();

// Date validators
export const zDate = z.date();
export const zDateString = z.string().datetime();
export const zNullableDate = z.date().nullable();

// Email validator
export const zEmail = z.string().email('Invalid email format').max(255, 'Email too long');
export const zNullableEmail = z
  .string()
  .email('Invalid email format')
  .max(255, 'Email too long')
  .nullable();

// URL validator
export const zUrl = z.string().url('Invalid URL format').max(500, 'URL too long');
export const zNullableUrl = z
  .string()
  .url('Invalid URL format')
  .max(500, 'URL too long')
  .nullable();
