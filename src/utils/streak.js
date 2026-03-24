/**
 * Calculate consecutive days of usage from history.
 * Walks backwards from today counting consecutive dates.
 */
export function calculateStreak(history) {
  if (!history || history.length === 0) return 0;

  const uniqueDates = [...new Set(history.map(r => r.date))].sort().reverse();
  if (uniqueDates.length === 0) return 0;

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  // Must include today or yesterday to count as active streak
  const latestDate = uniqueDates[0];
  const latestMs = new Date(latestDate + "T00:00:00").getTime();
  const todayMs = new Date(todayStr + "T00:00:00").getTime();
  const diffDays = Math.round((todayMs - latestMs) / (1000 * 60 * 60 * 24));
  if (diffDays > 1) return 0; // streak broken

  let streak = 1;
  for (let i = 0; i < uniqueDates.length - 1; i++) {
    const curr = new Date(uniqueDates[i] + "T00:00:00").getTime();
    const prev = new Date(uniqueDates[i + 1] + "T00:00:00").getTime();
    const gap = Math.round((curr - prev) / (1000 * 60 * 60 * 24));
    if (gap === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}
