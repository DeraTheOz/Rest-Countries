/**
 * Format a number with commas (e.g. 1234567 → "1,234,567")
 * @param {number|string} value - The numeric value to format
 * @returns {string} Formatted number string
 */

export function formatNumber(value) {
  if (value === null || value === undefined || isNaN(value)) return "";

  return new Intl.NumberFormat("en-US").format(Number(value));
}
