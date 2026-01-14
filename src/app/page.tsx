"use client";

// We import the React's useStat so the page can react to user input.
import { useState } from "react";

// Import your zodiac function from the module you created.
import { getZodiacForYear } from "@/zodiac/zodiac";

export default function HomePage() {
  // Start with the current year as the default.
  // This makes the page immediately show the user's zodiac when it loads.
  const currentYear = new Date().getFullYear();

  // React state to store the year user is typing.
  const [year, setYear] = useState<number>(currentYear);

  // Compute the zodiac animal for the selected year.
  const zodiac = getZodiacForYear(year);

  return (
    <main className="p-6 space-y-6">
      {/* Page title */}
      <h1 className="text-3xl font-bold">Lunar Zodiac Finder</h1>

      {/* Input field for the year */}
      <div className="space-y-2">
        <label htmlFor="year-input" className="block font-medium">
          Enter a year to see its zodiac:
        </label>

        <input 
          id="year-input"
          type="number" 
          value={year} 
          onChange={(e) => setYear(Number(e.target.value))} 
          className="border rounded px-3 py-2 w-40" 
        />
      </div>

      {/* Display the zodiac result */}
      <div className="text-xl">
        Zodiac Animal for {year}: <span className="font-semibold">{zodiac}</span>
      </div>
    </main>
  );
}