import { LOCALE_PACKS, resolveLocalePack } from "../locales";
import { LocaleKey, ParsedField } from "../types";
import { capitalizeFirst } from "../utils/strings";
import { describeDayOfMonth, describeDayOfWeek, describeDayOfWeekListNatural, describeMonth, describeTime, describeYear, joinParts } from "./describers";
import { normalizeCron } from "./normalize-cron";
import { parseField } from "./parse-field";

export function cronToReadable(
  expr: string,
  locale: LocaleKey = "pt-BR",
): string {
  if (!expr) {
    return "";
  }
  const t = resolveLocalePack(locale);

  let parts;
  try {
    parts = normalizeCron(expr);
  } catch {
    return expr;
  }

  const month = describeMonth(parseField(parts.month), t);
  const domField = parseField(parts.dayOfMonth);
  const dowField = parseField(parts.dayOfWeek);
  const dom = describeDayOfMonth(domField, t);
  const dow = describeDayOfWeek(dowField, t);
  const year = describeYear(parts.year ? parseField(parts.year) : undefined, t);
  const time = describeTime(parts, t);

  const dayLayer = (() => {
    if (domField.kind === "any" && dowField.kind === "any") {
      return t.everyDay;
    }
    if (domField.kind === "any") {
      if (dowField.kind === "list") {
        return `${t.onlyOn} ${describeDayOfWeekListNatural(dowField, t)}`;
      }
      if (dowField.kind === "literal") {
        const fauxList: ParsedField = {
          ...dowField,
          kind: "list",
          values: [dowField.raw],
        };
        return `${t.onlyOn} ${describeDayOfWeekListNatural(fauxList, t)}`;
      }
    }
    return [dom, dow].filter(Boolean).join(" ").trim();
  })();

  const monthPhrase = month === t.everyMonth ? "" : month;

  const dayLayerWithMonthContext = (() => {
    if (
      monthPhrase ||
      domField.kind === "any" ||
      domField.kind === "question" ||
      domField.kind === "last" ||
      domField.kind === "lastWeekday"
    ) {
      return dayLayer;
    }

    if (domField.kind === "weekdayNearest") {
      return `${dayLayer} ${t.ofMonth}`;
    }

    return `${dayLayer} ${t.ofMonth}`.trim();
  })();

  const dayLayerWithPreposition = (() => {
    if (!dayLayerWithMonthContext) {
      return "";
    }
    if (
      dayLayerWithMonthContext === t.everyDay ||
      dayLayerWithMonthContext.startsWith(t.onlyOn)
    ) {
      return dayLayerWithMonthContext;
    }
    if (domField.kind === "any" && dowField.kind === "range") {
      if (t === LOCALE_PACKS["pt-BR"]) {
        const phrase = dayLayerWithMonthContext.startsWith("de")
          ? dayLayerWithMonthContext
          : `de ${dayLayerWithMonthContext}`;
        return phrase.trim();
      }
      return dayLayerWithMonthContext;
    }
    return `${t.on} ${dayLayerWithMonthContext}`;
  })();

  const pieces = (() => {
    const base = [
      time,
      dayLayerWithPreposition,
      monthPhrase ? `${t.in} ${monthPhrase}` : "",
      year,
    ];
    if (
      t === LOCALE_PACKS["pt-BR"] &&
      dayLayerWithPreposition &&
      domField.kind !== "any"
    ) {
      const dayPhrase = capitalizeFirst(dayLayerWithPreposition);
      return [
        dayPhrase,
        time,
        monthPhrase ? `${t.in} ${monthPhrase}` : "",
        year,
      ];
    }
    return base;
  })();
  return joinParts(pieces, t);
}

export const __cronReadableInternals = {
  normalizeCron,
  parseField,
  describeMonth,
  describeDayOfMonth,
  describeDayOfWeek,
  describeTime,
  describeYear,
};
