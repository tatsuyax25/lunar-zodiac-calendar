import { Zodiac } from "./zodiac";

/**
 * Each zodiac animal gets a primary color.
 * These colors can later expand into full themes (background, border, accent).
 */
export const ZODIAC_COLORS: Record<Zodiac, string> = {
  [Zodiac.Rat]: "#6B7280",      // Gray
  [Zodiac.Ox]: "#92400E",       // Brown
  [Zodiac.Tiger]: "#D97706",    // Orange
  [Zodiac.Rabbit]: "#10B981",   // Green 
  [Zodiac.Dragon]: "#DC2626",   // Red 
  [Zodiac.Snake]: "#4B5563",    // Dark Gray 
  [Zodiac.Horse]: "#2563EB",    // Blue 
  [Zodiac.Goat]: "#7C3AED",     // Purple 
  [Zodiac.Monkey]: "#F59E0B",   // Gold 
  [Zodiac.Rooster]: "#F87171",  // Light Red 
  [Zodiac.Dog]: "#8B5CF6",      // Violet 
  [Zodiac.Pig]: "#EC4899",      // Pink
}