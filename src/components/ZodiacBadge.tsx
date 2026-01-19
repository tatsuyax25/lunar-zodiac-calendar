"use client";

import { useEffect, useRef } from "react";
import { getZodiacForYear, Zodiac } from "@/zodiac/zodiac";
import { ZODIAC_COLORS } from "@/zodiac/zodiacColors";
import styles from "./ZodiacBadge.module.css";

interface ZodiacBadgeProps {
  readonly year: number; // The year we want to display the zodiac for
}

/** 
 * A small visual badge that shows:
 * - the zodiac animal for the selected year
 * - a colored background based on the zodiac theme
 * 
 * This component is intentionally simple and reusable.
 * Later, you can expand it with icons, animations, or metadata.
 */
export default function ZodiacBadge({ year }: ZodiacBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  
  // Determine the zodiac animal for the given year
  const zodiac = getZodiacForYear(year);

  // Get the color associated with that zodiac
  const color = ZODIAC_COLORS[zodiac];

  useEffect(() => {
    if (badgeRef.current) {
      badgeRef.current.style.setProperty("--zodiac-color", color);
      badgeRef.current.style.setProperty("--zodiac-bg", `${color}33`);
    }
  }, [color]);

  return (
    <div 
      ref={badgeRef}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-md ${styles.badge}`}
    >
      {/* Zodiac label */}
      <span className={`font-semibold ${styles.label}`}>
        {zodiac}
      </span>
    </div>
  )
}