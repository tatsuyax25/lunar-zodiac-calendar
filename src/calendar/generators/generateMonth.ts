import { CalendarDay, CalendarGrid } from "@/calendar/types/CalendarTypes";
import { getDaysInMonth, getStartDayOfMonth } from "@/calendar/utils/dateUtils";

/**
 * Generates a 6x7 calendar grid for a given month and year.
 * This matches how most calendar UIs work (Google Calendar, Apple Calendar, etc).
 */
export function generateMonth(year: number, month: number): CalendarGrid {
  const daysInMonth = getDaysInMonth(year, month);
  const startDay = getStartDayOfMonth(year, month);

  const grid: CalendarGrid = [];
  let currentDay = 1;

  // Build 6 weeks (rows)
  for (let week = 0; week < 6; week++) {
    const row: CalendarDay[] = [];

    // Build 7 days (columns)
    for (let day = 0; day < 7; day++) {
      const cellIndex = week * 7 + day;

      // Before the first day of the month -> empty placeholder
      const isCurrentMonth = cellIndex >= startDay && currentDay <= daysInMonth;

      const date = isCurrentMonth
        ? new Date(year, month, currentDay)
        : new Date(year, month, 1); // Placeholder date for non-current month days
      
      row.push({
        date,
        day: isCurrentMonth ? currentDay : 0,
        month,
        year,
        isCurrentMonth,
      });

      if (isCurrentMonth) currentDay++;
    }

    grid.push(row);
  }

  return grid;
}