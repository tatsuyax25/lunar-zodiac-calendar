"use client";

import { useState } from "react";
import ZodiacBadge from "@/components/ZodiacBadge";
import CalendarGrid from "@/components/CalendarGrid";
import { getZodiacForDate } from "@/zodiac/zodiac";
import { getLunarNewYearDate } from "@/zodiac/zodiac";
import styles from "./page.module.css";

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
    
    const birthZodiac = getZodiacForDate(birthYear, 6, 1); // Mid-year
    const currentYear = today.getFullYear();
    const past: number[] = [];
    const future: number[] = [];

    // Find past zodiac years
    for (let y = birthYear; y < currentYear; y += 12) {
      if (y !== birthYear) past.push(y);
    }

    // Find future zodiac years
    for (let i = 1; i <= 5; i++) {
      const nextYear = currentYear + (12 - ((currentYear - birthYear) % 12)) + ((i - 1) * 12);
      if (getZodiacForDate(nextYear, 6, 1) === birthZodiac) {
        future.push(nextYear);
      }
    }

    return { past: past.slice(-3), future: future.slice(0, 5), zodiac: birthZodiac };
  };

  const zodiacYears = getZodiacYears();
  const lunarNewYear = getLunarNewYearDate(year);

  return (
    <main className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen">
      {/* Decorative elements */}
      <div className={`fixed top-10 right-10 text-9xl opacity-5 pointer-events-none select-none ${styles.decorativeElement}`}>
        🏮
      </div>
      <div className={`fixed bottom-10 left-10 text-9xl opacity-5 pointer-events-none select-none ${styles.decorativeElement}`}>
        🧧
      </div>
      
      <h1 className={`text-4xl font-bold text-center text-red-800 ${styles.pageTitle}`}>
        🏮 Lunar Zodiac Calendar 🏮
      </h1>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Left Column - Your Zodiac Year */}
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg space-y-3 border border-red-100">
          <h2 className="text-xl font-semibold">Your Zodiac Year</h2>
          <div>
            <label htmlFor="birth-year" className="block text-sm font-medium mb-1">Birth Year:</label>
            <input
              id="birth-year"
              type="number"
              placeholder="e.g., 1990"
              onChange={(e) => setBirthYear(e.target.value ? Number(e.target.value) : null)}
              className="border rounded px-3 py-2 w-full text-sm"
            />
          </div>

          {birthYear && zodiacYears.zodiac && (
            <div className="space-y-3">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-medium text-gray-600">Your Zodiac:</span>
                <ZodiacBadge year={birthYear} />
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-1">Past Years:</h3>
                <div className="space-y-1">
                  {zodiacYears.past.length > 0 ? (
                    zodiacYears.past.map((y) => (
                      <div key={y} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{y}</span>
                        <button
                          onClick={() => setYear(y)}
                          className="text-xs text-blue-600 hover:underline"
                        >
                          View
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-500">None yet</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold mb-1">Future Years:</h3>
                <div className="space-y-1">
                  {zodiacYears.future.map((y) => (
                    <div key={y} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{y}</span>
                      <button
                        onClick={() => setYear(y)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Calendar View */}
        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg shadow-lg space-y-4 border border-red-100">
            <h2 className="text-2xl font-semibold">Calendar View</h2>
            <div className="flex items-center gap-3">
              <span className="text-lg">Viewing:</span>
              <ZodiacBadge year={year} month={month} day={15} />
            </div>
            
            {lunarNewYear && (
              <div className="text-sm text-gray-600 bg-yellow-50 p-3 rounded border border-yellow-200">
                ℹ️ Lunar New Year {year}: {lunarNewYear}
              </div>
            )}
            
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
        </div>
      </div>
    </main>
  );
}

