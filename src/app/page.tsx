"use client";

// We import useState so the page can react to user input.
// This makes the page interactive (client component).
import { useState } from "react";

// Import the ZodiacBadge component
import ZodiacBadge from "@/components/ZodiacBadge";

// Import the CalendarGrid component you created.
// This component renders the 6×7 month layout.
import CalendarGrid from "@/components/CalendarGrid";

export default function HomePage() {
  // Get today's date so the calendar starts on the current month/year.
  const today = new Date();

  // Store the selected year in React state.
  // Default: current year.
  const [year, setYear] = useState(today.getFullYear());

  // Store the selected month in React state.
  // JS months are 0–11, so January = 0, December = 11.
  const [month, setMonth] = useState(today.getMonth());

  return (
    <main className="p-6 space-y-6">
      {/* Page title */}
      <h1 className="text-3xl font-bold">Lunar Zodiac Calendar</h1>

      {/* Zodiac badge for the selected year */}
      <ZodiacBadge year={year} />

      {/* YEAR INPUT SECTION */}
      <div className="space-y-2">
        <label htmlFor="year-input" className="block font-medium">Year:</label>

        {/* Input for selecting the year.
            - type="number" ensures numeric input
            - onChange updates the state so the UI re-renders */}
        <input
          id="year-input"
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="border rounded px-3 py-2 w-40"
        />
      </div>

      {/* MONTH INPUT SECTION */}
      <div className="space-y-2">
        <label htmlFor="month-input" className="block font-medium">Month (0–11):</label>

        {/* Input for selecting the month.
            - min/max restrict input to valid JS month range
            - month is stored as a number in state */}
        <input
          id="month-input"
          type="number"
          min={0}
          max={11}
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          className="border rounded px-3 py-2 w-40"
        />
      </div>

      {/* CALENDAR GRID RENDERING */}
      {/* We pass the selected year and month into the CalendarGrid component.
          The component uses your calendar engine to generate the month layout. */}
      <CalendarGrid year={year} month={month} />
    </main>
  );
}

