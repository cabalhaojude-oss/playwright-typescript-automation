export function getNextDayString(days: number) {
  const currentDate = new Date();
  const nextDate = new Date();
  nextDate.setDate(currentDate.getDate() + days);
  const month = String(nextDate.getMonth() + 1).padStart(2, "0");
  const day = String(nextDate.getDate()).padStart(2, "0");
  const year = nextDate.getFullYear();

  return `${month}/${day}/${year}`;
}
