export function daysUntilOct1(asOf = new Date()) {
  const targetYear = asOf.getMonth() > 9 || (asOf.getMonth() === 9 && asOf.getDate() > 1)
    ? asOf.getFullYear() + 1
    : asOf.getFullYear();
  const target = new Date(targetYear, 9, 1);
  return Math.max(0, Math.ceil((target.getTime() - asOf.getTime()) / 86_400_000));
}
