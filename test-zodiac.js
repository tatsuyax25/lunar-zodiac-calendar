// Test the zodiac calculation
const ZODIAC_CYCLE = ['Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake', 'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'];
const BASE_YEAR = 1900;

// 2024 should be Dragon, 2025 should be Snake
for (let year = 2024; year <= 2026; year++) {
  const diff = year - BASE_YEAR;
  const index = ((diff % 12) + 12) % 12;
  console.log(`Year ${year}: index=${index}, zodiac=${ZODIAC_CYCLE[index]}`);
}

console.log('\nExpected: 2024=Dragon, 2025=Snake, 2026=Horse');
