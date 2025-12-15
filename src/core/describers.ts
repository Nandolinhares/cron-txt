import { LOCALE_PACKS } from "../locales";
import { LocalePack, NormalizedCron, ParsedField } from "../types";
import { mapDay, mapMonth } from "../utils/aliases";
import { capitalizeFirst, formatOrdinalDayPt, pad2 } from "../utils/strings";
import { parseField } from "./parse-field";

export function formatList(items: string[], t: LocalePack): string {
  return t.listFormatter([...items]);
}

export function describeStep(
  base: string | undefined,
  step: string | undefined,
  unit: string,
  t: LocalePack,
): string {
  if (!step) {
    return unit;
  }
  if (!base || base === "*") {
    return `${t.every} ${step} ${unit}`;
  }
  return `${t.every} ${step} ${unit} (${t.at} ${base})`;
}

export function describeMonth(field: ParsedField, t: LocalePack): string {
  switch (field.kind) {
    case "any":
      return t.everyMonth;
    case "list": {
      const names =
        field.values?.map(
          (m) => t.months[(Number(mapMonth(m)) - 1 + 12) % 12],
        ) ?? [];
      return formatList(names, t);
    }
    case "range": {
      const start =
        t.months[(Number(mapMonth(field.start ?? "1")) - 1 + 12) % 12];
      const end = t.months[(Number(mapMonth(field.end ?? "1")) - 1 + 12) % 12];
      return `${start}${t.through}${end}`;
    }
    case "step":
      return describeStep(field.base, field.step, t.monthWord, t);
    case "literal": {
      const idx = Number(mapMonth(field.raw));
      if (!Number.isNaN(idx)) {
        return t.months[(idx - 1 + 12) % 12];
      }
      return field.raw;
    }
    default:
      return field.raw;
  }
}

export function describeDayOfMonth(field: ParsedField, t: LocalePack): string {
  switch (field.kind) {
    case "any":
    case "question":
      return "";
    case "list":
      return `${t.dayWord} ${formatList(field.values ?? [], t)}`;
    case "range":
      return `${t.dayWord} ${field.start}${t.through}${field.end}`;
    case "step":
      return describeStep(field.base, field.step, t.dayPlural, t);
    case "weekdayNearest":
      return `${t.weekdayNearest} ${field.base}`;
    case "lastWeekday": {
      if (field.base) {
        const weekday = mapDay(field.base);
        const name =
          typeof weekday === "number" ? t.days[weekday] : String(weekday);
        return t.lastWeekdayOfMonth(name);
      }
      return t.weekdayLast;
    }
    case "last":
      return t.lastDayOfMonth;
    case "literal":
      if (t === LOCALE_PACKS["pt-BR"]) {
        return `${t.dayWord} ${formatOrdinalDayPt(field.raw)}`;
      }
      return `${t.dayWord} ${field.raw}`;
    default:
      return field.raw;
  }
}

export function describeDayOfWeek(field: ParsedField, t: LocalePack): string {
  const mapName = (v: string) => t.days[(Number(mapDay(v)) + 7) % 7];
  switch (field.kind) {
    case "any":
    case "question":
      return "";
    case "list": {
      const names = field.values?.map(mapName) ?? [];
      return formatList(names, t);
    }
    case "range": {
      const start = mapName(field.start ?? "0");
      const end = mapName(field.end ?? "0");
      if (t === LOCALE_PACKS["pt-BR"]) {
        const lowerStart = start.toLowerCase();
        const lowerEnd = end.toLowerCase();
        const withFeira = (name: string) =>
          ["segunda", "terça", "quarta", "quinta", "sexta"].includes(name)
            ? `${name}-feira`
            : name;
        const startWord = [
          "segunda",
          "terça",
          "quarta",
          "quinta",
          "sexta",
        ].includes(lowerStart)
          ? lowerStart
          : withFeira(lowerStart);
        const endWord = withFeira(lowerEnd);
        const sep = " a ";
        return `${startWord}${sep}${endWord}`;
      }
      return `${start}${t.through}${end}`;
    }
    case "step":
      return describeStep(field.base, field.step, t.dayPlural, t);
    case "nthWeekday": {
      const weekday = mapName(field.values?.[0] ?? "0");
      return t.nthWeekday(field.nth ?? "1", weekday);
    }
    case "lastWeekday": {
      const weekday = field.base ? mapName(field.base) : undefined;
      if (weekday) {
        if (t === LOCALE_PACKS["pt-BR"]) {
          const lower = weekday.toLowerCase();
          const withFeira = [
            "segunda",
            "terça",
            "quarta",
            "quinta",
            "sexta",
          ].includes(lower)
            ? `${lower}-feira`
            : lower;
          const capitalized = capitalizeFirst(withFeira);
          return t.lastWeekdayOfMonth(capitalized);
        }
        return t.lastWeekdayOfMonth(weekday);
      }
      return t.weekdayLast;
    }
    case "literal":
      return mapName(field.raw);
    default:
      return field.raw;
  }
}

export function describeDayOfWeekListNatural(
  field: ParsedField,
  t: LocalePack,
): string {
  const mapName = (v: string) => t.days[(Number(mapDay(v)) + 7) % 7];
  const names = field.values?.map(mapName) ?? [];
  if (t === LOCALE_PACKS["pt-BR"]) {
    const transformed = names.map((name) => {
      const lower = name.toLowerCase();
      if (["segunda", "terça", "quarta", "quinta", "sexta"].includes(lower)) {
        return `${lower}s-feiras`;
      }
      return `${lower}s`;
    });
    return formatList(transformed, t);
  }
  return formatList(names, t);
}

export function describeTime(parts: NormalizedCron, t: LocalePack): string {
  const secField = parts.seconds ? parseField(parts.seconds) : undefined;
  const minField = parseField(parts.minutes);
  const hourField = parseField(parts.hours);

  if (
    secField &&
    secField.kind === "step" &&
    minField.kind === "any" &&
    hourField.kind === "any"
  ) {
    return t.everySecond(secField.step ?? "1");
  }
  if (minField.kind === "step" && hourField.kind === "any") {
    return t.everyMinute(minField.step ?? "1");
  }
  if (
    hourField.kind === "step" &&
    minField.kind === "literal" &&
    (!secField || secField.kind !== "literal")
  ) {
    const minute = Number(minField.raw);
    const every = t.everyHour(hourField.step ?? "1");
    const minutePhrase =
      t === LOCALE_PACKS["pt-BR"]
        ? `no minuto ${pad2(minute)}`
        : `${t.at} ${t.minutesPastHour(minute)}`;
    const baseHour = Number(hourField.base ?? hourField.raw ?? 0);
    const startHour = Number.isNaN(baseHour) ? 0 : baseHour;
    const startTime =
      t.formatTimeVerbose?.(startHour, 0) ?? t.formatTime(startHour, 0);
    const start = `${t.startingAt} ${startTime}`;
    return `${capitalizeFirst(every)}, ${minutePhrase}, ${start}`;
  }

  if (minField.kind === "literal" && hourField.kind === "any") {
    const minute = Number(minField.raw);
    if (t === LOCALE_PACKS["pt-BR"]) {
      return `A cada hora (aos ${pad2(minute)} minutos)`;
    }
    return `${capitalizeFirst(t.at)} ${t.minutesPastHour(minute)}`;
  }

  const minutes =
    minField.kind === "list" ? (minField.values ?? []) : [minField.raw];
  const hours =
    hourField.kind === "list" ? (hourField.values ?? []) : [hourField.raw];
  const fixedHour = hourField.kind === "literal" || hourField.kind === "list";
  const fixedMinute = minField.kind === "literal" || minField.kind === "list";

  if (fixedHour && fixedMinute) {
    const combos: string[] = [];
    hours.forEach((h) => {
      minutes.forEach((m) => {
        combos.push(t.formatTime(Number(h), Number(m)));
      });
    });
    return `${capitalizeFirst(t.at)} ${formatList(combos, t)}`;
  }

  if (fixedHour && minField.kind === "any") {
    const hoursText = formatList(
      hours.map((h) => pad2(h)),
      t,
    );
    return `${t.everyHour("1")} ${t.at} ${hoursText}${t.timeSeparator}${pad2(0)}`;
  }

  return "";
}

export function describeYear(field: ParsedField | undefined, t: LocalePack): string {
  if (!field) {
    return "";
  }
  switch (field.kind) {
    case "any":
      return t.everyYear;
    case "list":
      return formatList(field.values ?? [], t);
    case "range":
      return `${field.start}${t.through}${field.end}`;
    case "step":
      return describeStep(field.base, field.step, t.monthWord, t);
    default:
      return field.raw;
  }
}

export function joinParts(parts: string[], t: LocalePack): string {
  const filtered = parts.filter((p) => p?.trim());
  if (filtered.length === 0) {
    return "";
  }
  if (filtered.length === 1) {
    return filtered[0];
  }
  if (
    filtered.length === 2 &&
    t === LOCALE_PACKS["pt-BR"] &&
    filtered[1].trim().startsWith("de ")
  ) {
    return `${filtered[0]}, ${filtered[1]}`;
  }
  if (
    filtered.length === 2 &&
    t === LOCALE_PACKS["pt-BR"] &&
    filtered[1].trim().toLowerCase().startsWith("a cada")
  ) {
    return `${filtered[0]}, ${filtered[1]}`;
  }
  if (
    filtered.length === 2 &&
    t === LOCALE_PACKS["pt-BR"] &&
    filtered[1].trim().startsWith("À")
  ) {
    return `${filtered[0]}, ${filtered[1]}`;
  }
  const last = filtered.pop();
  return `${filtered.join(", ")}${t.andWord}${last}`;
}
