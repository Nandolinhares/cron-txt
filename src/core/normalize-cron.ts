import { NormalizedCron } from "../types";

export function normalizeCron(expr: string): NormalizedCron {
  const clean = expr
    .trim()
    .replace(/["']/g, "")
    .replace(/[–—]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

  const parts = clean.split(" ");
  if (parts.length < 5) {
    throw new Error("Cron expression must have at least 5 fields");
  }

  if (parts.length === 5) {
    const [m, h, dom, mon, dow] = parts;
    return {
      seconds: undefined,
      minutes: m,
      hours: h,
      dayOfMonth: dom,
      month: mon,
      dayOfWeek: dow,
      year: undefined,
    };
  }
  if (parts.length === 6) {
    const [s, m, h, dom, mon, dow] = parts;
    return {
      seconds: s,
      minutes: m,
      hours: h,
      dayOfMonth: dom,
      month: mon,
      dayOfWeek: dow,
      year: undefined,
    };
  }
  const [s, m, h, dom, mon, dow, y] = parts;
  return {
    seconds: s,
    minutes: m,
    hours: h,
    dayOfMonth: dom,
    month: mon,
    dayOfWeek: dow,
    year: y,
  };
}
