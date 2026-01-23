"use client";

import { useState } from "react";
import ZodiacBadge from "@/components/ZodiacBadge";
import CalendarGrid from "@/components/CalendarGrid";
import { getZodiacForYear } from "@/zodiac/zodiac";

export default function HomePage() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [birthYear, setBirthYear] = useState<number | null>(null);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Calculate zodiac years for birth year
  const getZodiacYears = () => {
    if (!birthYear) return { past: [], future: [] };
    
    const birthZodiac = getZodiacForYear(birthYear);
    const currentYear = today.getFullYear();
    const past: number[] = [];
    const future: number[] = [];

    // Find past zodiac years (up to 5 occurrences before current year)
    for (let y = birthYear; y < currentYear; y += 12) {
      if (y !== birthYear) past.push(y);
    }

    // Find future zodiac years (next 5 occurrences)
    for (let i = 1; i <= 5; i++) {
      const nextYear = currentYear + (12 - ((currentYear - birthYear) % 12)) + ((i - 1) * 12);
      if (getZodiacForYear(nextYear) === birthZodiac) {
        future.push(nextYear);
      }
    }

    return { past: past.slice(-3), future: future.slice(0, 5), zodiac: birthZodiac };
  };

  const zodiacYears = getZodiacYears();

  return (
    <main className="p-6 max-w-6xl mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-center">Lunar Zodiac Calendar</h1>

      {/* Birth Year Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-semibold">Your Zodiac Year</h2>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label htmlFor="birth-year" className="block font-medium mb-2">Enter Your Birth Year:</label>
            <input
              id="birth-year"
              type="number"
              placeholder="e.g., 1990"
              onChange={(e) => setBirthYear(e.target.value ? Number(e.target.value) : null)}
              className="border rounded px-4 py-2 w-full"
            />
          </div>
        </div>

        {birthYear && zodiacYears.zodiac && (
          <div className="space-y-4 mt-6">
            <div className="flex items-center gap-3">
              <span className="text-lg">Your Zodiac:</span>
              <ZodiacBadge year={birthYear} />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-lg mb-2">Past Zodiac Years:</h3>
                <div className="space-y-2">
                  {zodiacYears.past.length > 0 ? (
                    zodiacYears.past.map((y) => (
                      <div key={y} className="flex items-center gap-2">
                        <span className="text-gray-600">{y}</span>
                        <button
                          onClick={() => setYear(y)}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          View Calendar
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No past years yet</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Future Zodiac Years:</h3>
                <div className="space-y-2">
                  {zodiacYears.future.map((y) => (
                    <div key={y} className="flex items-center gap-2">
                      <span className="text-gray-600">{y}</span>
                      <button
                        onClick={() => setYear(y)}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        View Calendar
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Calendar Controls */}
      <div className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-semibold">Calendar View</h2>
        <div className="flex items-center gap-3">
          <span className="text-lg">Viewing:</span>
          <ZodiacBadge year={year} />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="year-input" className="block font-medium mb-2">Year:</label>
            <input
              id="year-input"
              type="number"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="border rounded px-4 py-2 w-full"
            />
          </div>

          <div>
            <label htmlFor="month-select" className="block font-medium mb-2">Month:</label>
            <select
              id="month-select"
              value={month}
              onChange={(e) => setMonth(Number(e.target.value))}
              className="border rounded px-4 py-2 w-full"
            >
              {months.map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => {
              setYear(today.getFullYear());
              setMonth(today.getMonth());
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Today
          </button>
          <button
            onClick={() => setMonth((month - 1 + 12) % 12)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous Month
          </button>
          <button
            onClick={() => setMonth((month + 1) % 12)}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next Month
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <CalendarGrid year={year} month={month} />
    </main>
  );
}

