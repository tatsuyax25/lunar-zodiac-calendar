/**
 * Represents a single day in the calendar grid.
 * This is the building block for the entire calendar UI.
 */
export interface CalendarDay {
  date: Date;           // The actual JS Date object
  day: number;         // Day of the month (1-31)
  month: number;      // Month (0-11)
  year: number;      // Full year (e.g., 2024)
  isCurrentMonth: boolean; // Is this day in the currently displayed month?
}

/**
 * Represents a full month grid (6 rows x 7 columns).
 * Each row is a week, each week contains 7 CalendarDay objects.
 */
export type CalendarGrid = CalendarDay[][];