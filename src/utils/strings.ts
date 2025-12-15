export function pad2(n: string | number): string {
  return String(n).padStart(2, "0");
}

export function capitalizeFirst(text: string): string {
  if (!text) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatOrdinalDayPt(value: string): string {
  const num = Number(value);
  if (Number.isNaN(num)) {
    return value;
  }
  return `${num}º`;
}
