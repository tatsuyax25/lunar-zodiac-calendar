"use client";

import { generateMonth } from "@/calendar/generators/generateMonth";
import { CalendarDay } from "@/calendar/types/CalendarTypes";

interface CalendarGridProps {
  readonly year: number;
  readonly month: number; // 0 = January, 11 = December (JS month index)
}

/**
 * Renders a full 6x7 calendar grid for a given month and year.
 * This component is purely visual - all the logic lives in the calendar engine.
 */
export default function CalendarGrid({ year, month }: CalendarGridProps) {
  // Generate the 6x7 grid using your calendar engine
  const grid = generateMonth(year, month);

  return (
    <div className="space-y-2">
      {/* Month + Year header */}
      <h2 className="text-2xl font-bold">
        {new Date(year, month).toLocaleString("default", { month: "long", })} {year}
      </h2>

      {/* Day-of-week labels */}
      <div className="grid grid-cols-7 text-center font-semibold">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {grid.map((week, weekIndex) =>
          week.map((day: CalendarDay, dayIndex) => (
            <div key={`${weekIndex}-${dayIndex}`} className={`border rounded p-2 text-center ${ day.isCurrentMonth ? "bg-white" : "bg-gray-100 text-gray-400" }`} >
              {day.day === 0 ? "" : day.day}
            </div>
          ))
        )}
      </div>
    </div>
  );
}