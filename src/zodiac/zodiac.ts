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

// 1900 is a know Rat year, so it's a valid anchor
const BASE_YEAR = 1900;

/** Returns the zodiac animal for a given Gregorian year. */
export function getZodiacForYear(year: number): Zodiac {
  const diff = year - BASE_YEAR;

  // Normalize modulo to avoid negative indices
  const index = ((diff % 12) + 12) % 12;

  return ZODIAC_CYCLE[index];
}