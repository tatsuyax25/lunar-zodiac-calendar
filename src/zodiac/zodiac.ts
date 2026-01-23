// We define an enum for the 12 Chinese zodiac animals.
// Using an enum gives us strong typing and avoids typos in string literals.
export enum Zodiac {
  Rat = "Rat",
  Ox = "OX",
  Tiger = "Tiger",
  Rabbit = "Rabbit",
  Dragon = "Dragon",
  Snake = "Snake",
  Horse = "Horse",
  Goat = "Goat",
  Monkey = "Monkey",
  Rooster = "Rooster",
  Dog = "Dog",
  Pig = "Pig",
}

// This array represents the repeating 12-year zodiac cycle.
// The order here is important: it matches the traditional zodiac sequence.
const ZODIAC_CYCLE: Zodiac[] = [
  Zodiac.Rat,
  Zodiac.Ox,
  Zodiac.Tiger,
  Zodiac.Rabbit,
  Zodiac.Dragon,
  Zodiac.Snake,
  Zodiac.Horse,
  Zodiac.Goat,
  Zodiac.Monkey,
  Zodiac.Rooster,
  Zodiac.Dog,
  Zodiac.Pig,
];

// Lunar New Year dates for accurate zodiac calculation
// Format: [year, month (0-indexed), day]
const LUNAR_NEW_YEAR_DATES: Record<number, [number, number]> = {
  2020: [0, 25], 2021: [1, 12], 2022: [1, 1], 2023: [0, 22], 2024: [1, 10],
  2025: [0, 29], 2026: [1, 17], 2027: [1, 6], 2028: [0, 26], 2029: [1, 13],
  2030: [1, 3], 2031: [0, 23], 2032: [1, 11], 2033: [0, 31], 2034: [1, 19],
};

const BASE_YEAR = 1900;

/** Returns the zodiac animal for a given date (year, month, day) */
export function getZodiacForDate(year: number, month: number, day: number): Zodiac {
  let zodiacYear = year;
  
  // Check if date is before Lunar New Year
  if (LUNAR_NEW_YEAR_DATES[year]) {
    const [lnyMonth, lnyDay] = LUNAR_NEW_YEAR_DATES[year];
    if (month < lnyMonth || (month === lnyMonth && day < lnyDay)) {
      zodiacYear = year - 1;
    }
  } else {
    // Fallback: assume Lunar New Year is around Feb 1
    if (month === 0) zodiacYear = year - 1;
  }
  
  const diff = zodiacYear - BASE_YEAR;
  const index = ((diff % 12) + 12) % 12;
  return ZODIAC_CYCLE[index];
}

/** Returns the zodiac animal for a given Gregorian year (simplified) */
export function getZodiacForYear(year: number): Zodiac {
  // Use Feb 1 as approximation for the year
  return getZodiacForDate(year, 1, 1);
}

/** Returns the Lunar New Year date as a formatted string */
export function getLunarNewYearDate(year: number): string | null {
  if (!LUNAR_NEW_YEAR_DATES[year]) return null;
  const [month, day] = LUNAR_NEW_YEAR_DATES[year];
  const months = ["January", "February", "March"];
  return `${months[month]} ${day}, ${year}`;
}

/** Returns the Lunar New Year day for a given year */
export function getLunarNewYearDay(year: number): { month: number; day: number } | null {
  if (!LUNAR_NEW_YEAR_DATES[year]) return null;
  const [month, day] = LUNAR_NEW_YEAR_DATES[year];
  return { month, day };
}