/**
 * Returns the number of days in a given month.
 * JS months are 0-11, so January = 0, December = 11.
 */
export function getDaysInMonth(year: number, month: number): number {
  // Passing 0 as the day gives the last day of the previous month.
  // Example: new Date(2025, 2, 0) -> February 28, 2025
  return new Date(year, month + 1, 0).getDate();
}

/**
 * Returns the day of the week the month starts on.
 * 0 = Sunday, 1 = Monday, ... 6 = Saturday
 */
export function getStartDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}