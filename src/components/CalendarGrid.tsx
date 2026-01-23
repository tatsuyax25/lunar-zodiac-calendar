"use client";

import { useEffect, useRef } from "react";
import { generateMonth } from "@/calendar/generators/generateMonth";
import { CalendarDay } from "@/calendar/types/CalendarTypes";

// Import zodiac logic + color map
import { getZodiacForDate, getLunarNewYearDay } from "@/zodiac/zodiac";
import { ZODIAC_COLORS } from "@/zodiac/zodiacColors";
import styles from "./CalendarGrid.module.css";

interface CalendarGridProps {
  readonly year: number;
  readonly month: number; // 0 = January, 11 = December (JS month index)
}

/**
 * Renders a full 6x7 calendar grid for a given month and year.
 * This component is purely visual - all the logic lives in the calendar engine.
 */
export default function CalendarGrid({ year, month }: CalendarGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const grid = generateMonth(year, month);
  const zodiac = getZodiacForDate(year, month, 15);
  const zodiacColor = ZODIAC_COLORS[zodiac];
  
  // Get current date for highlighting
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const currentDay = today.getDate();
  
  // Get Lunar New Year date for highlighting
  const lunarNewYear = getLunarNewYearDay(year);
  const isLunarNewYearMonth = lunarNewYear?.month === month;

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.setProperty("--zodiac-color", zodiacColor);
      containerRef.current.style.setProperty("--zodiac-bg", `${zodiacColor}20`);
    }
  }, [zodiacColor]);

  return (
    <div
      ref={containerRef}
      className={`space-y-2 p-4 rounded-lg shadow-md ${styles.calendarContainer}`}
      data-zodiac-color={zodiacColor}
      data-zodiac-bg={`${zodiacColor}20`}
    >
      {/* Month + Year header, styled with zodiac color */}
      <h2 className={`text-2xl font-bold ${styles.monthHeader}`}>
        {new Date(year, month).toLocaleString("default", { month: "long", })} {year}
      </h2>

      {/* Legend */}
      <div className="flex gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span>Lunar New Year</span>
        </div>
      </div>

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
          week.map((day: CalendarDay, dayIndex) => {
            const isToday = isCurrentMonth && day.day === currentDay && day.isCurrentMonth;
            const isLunarNewYear = isLunarNewYearMonth && day.day === lunarNewYear?.day && day.isCurrentMonth;
            
            return (
              <div 
                key={`${weekIndex}-${dayIndex}`} 
                className={`border rounded p-2 text-center ${styles.dayCell} ${
                  isToday 
                    ? "bg-blue-500 text-white font-bold" 
                    : isLunarNewYear 
                    ? "bg-red-500 text-white font-bold"
                    : day.isCurrentMonth 
                    ? "bg-white" 
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {day.day === 0 ? "" : day.day}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}