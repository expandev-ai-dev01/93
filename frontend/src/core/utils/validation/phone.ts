/**
 * @utility isValidPhone
 * @summary Validates Brazilian phone number format
 * @category validation
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\(?\d{2}\)?\s?9?\d{4}-?\d{4}$/;
  return phoneRegex.test(phone);
};

/**
 * @utility formatPhone
 * @summary Formats phone number to Brazilian format
 * @category formatting
 */
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }

  return phone;
};
