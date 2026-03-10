/**
 * Shared validation for lead form and API.
 */

export const EGYPT_PHONE_REGEX = /^(\+20|0)?1[0-2,5]{1}[0-9]{8}$/;

export function normalizeEgyptPhone(value: string): string {
  return value.replace(/\s/g, "");
}

export function isValidEgyptPhone(value: string): boolean {
  return EGYPT_PHONE_REGEX.test(normalizeEgyptPhone(value));
}
