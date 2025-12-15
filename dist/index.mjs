// src/utils/strings.ts
function pad2(n) {
  return String(n).padStart(2, "0");
}
function capitalizeFirst(text) {
  if (!text) {
    return text;
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// src/locales/index.ts
function ordinalSuffix(n) {
  const num = Number.parseInt(n, 10);
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return "st";
  }
  if (j === 2 && k !== 12) {
    return "nd";
  }
  if (j === 3 && k !== 13) {
    return "rd";
  }
  return "th";
}
var EN_PACK = {
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  months: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  monthWord: "months",
  dayPlural: "days",
  everyDay: "every day",
  every: "every",
  at: "at",
  onlyOn: "only on",
  on: "on",
  in: "in",
  andWord: " and ",
  through: " through ",
  minutesPastHour: (minute) => `${pad2(minute)} minutes past the hour`,
  startingAt: "starting at",
  everyMinute: (step) => `every ${step} minutes`,
  everyHour: (step) => `every ${step} hours`,
  everySecond: (step) => `every ${step} seconds`,
  everyMonth: "every month",
  everyYear: "every year",
  ofMonth: "of the month",
  dayWord: "day",
  weekdayNearest: "weekday nearest to",
  weekdayLast: "last weekday of the month",
  lastDayOfMonth: "last day of the month",
  nthWeekday: (n, weekday) => `the ${n}${ordinalSuffix(n)} ${weekday} of the month`,
  lastWeekdayOfMonth: (weekday) => `last ${weekday} of the month`,
  listFormatter: (items) => {
    if (items.length === 1) {
      return items[0];
    }
    const last = items.pop();
    return `${items.join(", ")} and ${last}`;
  },
  timeSeparator: ":",
  formatTime: (hour, minute) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${pad2(hour12)}:${pad2(minute)} ${suffix}`;
  },
  formatTimeVerbose: (hour, minute) => {
    const suffix = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${pad2(hour12)}:${pad2(minute)} ${suffix}`;
  }
};
var PT_PACK = {
  days: ["Domingo", "Segunda", "Ter\xE7a", "Quarta", "Quinta", "Sexta", "S\xE1bado"],
  months: [
    "janeiro",
    "fevereiro",
    "mar\xE7o",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro"
  ],
  monthWord: "meses",
  dayPlural: "dias",
  everyDay: "todos os dias",
  every: "a cada",
  at: "\xE0s",
  onlyOn: "somente \xE0s",
  on: "no",
  in: "em",
  andWord: " e ",
  through: " at\xE9 ",
  minutesPastHour: (minute) => `${minute} minutos de cada hora`,
  startingAt: "a partir de",
  everyMinute: (step) => `a cada ${step} minutos`,
  everyHour: (step) => `a cada ${step} horas`,
  everySecond: (step) => `a cada ${step} segundos`,
  everyMonth: "todos os meses",
  everyYear: "todos os anos",
  ofMonth: "do m\xEAs",
  dayWord: "dia",
  weekdayNearest: "dia \xFAtil mais pr\xF3ximo de",
  weekdayLast: "\xFAltimo dia \xFAtil do m\xEAs",
  lastDayOfMonth: "\xFAltimo dia do m\xEAs",
  nthWeekday: (n, weekday) => `${n}\xBA ${weekday} do m\xEAs`,
  lastWeekdayOfMonth: (weekday) => `\xFAltima ${weekday} do m\xEAs`,
  listFormatter: (items) => {
    if (items.length === 1) {
      return items[0];
    }
    const last = items.pop();
    return `${items.join(", ")} e ${last}`;
  },
  timeSeparator: "h",
  formatTime: (hour, minute) => `${pad2(hour)}h${pad2(minute)}`,
  formatTimeVerbose: (hour, minute) => {
    const h = String(hour);
    const base = minute === 0 ? `${h}h` : `${h}h${pad2(minute)}`;
    if (hour < 12) {
      return `${base} da manh\xE3`;
    }
    if (hour < 18) {
      return `${base} da tarde`;
    }
    return `${base} da noite`;
  }
};
var LOCALE_PACKS = {
  "pt-BR": PT_PACK,
  en: EN_PACK,
  "en-US": EN_PACK
};
function resolveLocalePack(locale) {
  return LOCALE_PACKS[locale] ?? LOCALE_PACKS["pt-BR"];
}

// src/utils/aliases.ts
var DOW_ALIASES = {
  SUN: 0,
  SUNDAY: 0,
  DOM: 0,
  DOMINGO: 0,
  MON: 1,
  MONDAY: 1,
  SEG: 1,
  SEGUNDA: 1,
  TUE: 2,
  TUESDAY: 2,
  TER: 2,
  TERCA: 2,
  TER\u00C7A: 2,
  WED: 3,
  WEDNESDAY: 3,
  QUA: 3,
  QUARTA: 3,
  THU: 4,
  THUR: 4,
  THURSDAY: 4,
  QUI: 4,
  QUINTA: 4,
  FRI: 5,
  FRIDAY: 5,
  SEX: 5,
  SEXTA: 5,
  SAT: 6,
  SATURDAY: 6,
  SAB: 6,
  SABADO: 6,
  S\u00C1BADO: 6
};
var MONTH_ALIASES = {
  JAN: 1,
  JANUARY: 1,
  FEV: 2,
  FEVEREIRO: 2,
  FEB: 2,
  FEBRUARY: 2,
  MAR: 3,
  MARCH: 3,
  MARCO: 3,
  MAR\u00C7O: 3,
  APR: 4,
  ABR: 4,
  ABRIL: 4,
  APRIL: 4,
  MAY: 5,
  MAI: 5,
  MAIO: 5,
  JUN: 6,
  JUNE: 6,
  JUNHO: 6,
  JUL: 7,
  JULY: 7,
  JULHO: 7,
  AUG: 8,
  AUGUST: 8,
  AGO: 8,
  AGOSTO: 8,
  SEP: 9,
  SEPT: 9,
  SEPTEMBER: 9,
  SET: 9,
  SETEMBRO: 9,
  OCT: 10,
  OCTOBER: 10,
  OUT: 10,
  OUTUBRO: 10,
  NOV: 11,
  NOVEMBER: 11,
  NOVEMBRO: 11,
  DEC: 12,
  DEZ: 12,
  DECEMBER: 12,
  DEZEMBRO: 12
};
function mapMonth(value) {
  const upper = value.toUpperCase();
  if (MONTH_ALIASES[upper]) {
    return MONTH_ALIASES[upper];
  }
  return value;
}
function mapDay(value) {
  const upper = value.toUpperCase();
  if (DOW_ALIASES[upper] !== void 0) {
    return DOW_ALIASES[upper];
  }
  return value;
}

// src/core/parse-field.ts
var RANGE_RE = /^([^/]+)-([^/]+)$/;
var STEP_RE = /^([^/]+)\/([^/]+)$/;
function parseField(raw) {
  const field = raw.trim();
  if (field === "*") {
    return { kind: "any", raw };
  }
  if (field === "?") {
    return { kind: "question", raw };
  }
  if (field.includes(",")) {
    return { kind: "list", raw, values: field.split(",") };
  }
  if (STEP_RE.test(field)) {
    const [, base, step] = field.match(STEP_RE) ?? [];
    return { kind: "step", raw, base, step };
  }
  if (RANGE_RE.test(field)) {
    const [, start, end] = field.match(RANGE_RE) ?? [];
    return { kind: "range", raw, start, end };
  }
  if (field === "LW") {
    return { kind: "lastWeekday", raw };
  }
  if (field.endsWith("W")) {
    const base = field.slice(0, -1);
    return { kind: "weekdayNearest", raw, base };
  }
  if (field.endsWith("L")) {
    const base = field.slice(0, -1);
    if (base) {
      return { kind: "lastWeekday", raw, base };
    }
    return { kind: "last", raw };
  }
  if (field.includes("#")) {
    const [weekday, nth] = field.split("#");
    return { kind: "nthWeekday", raw, values: [weekday], nth };
  }
  return { kind: "literal", raw };
}

// src/core/describers.ts
function formatList(items, t) {
  return t.listFormatter([...items]);
}
function describeStep(base, step, unit, t) {
  if (!step) {
    return unit;
  }
  if (!base || base === "*") {
    return `${t.every} ${step} ${unit}`;
  }
  return `${t.every} ${step} ${unit} (${t.at} ${base})`;
}
function describeMonth(field, t) {
  switch (field.kind) {
    case "any":
      return t.everyMonth;
    case "list": {
      const names = field.values?.map((m) => t.months[(Number(mapMonth(m)) - 1 + 12) % 12]) ?? [];
      return formatList(names, t);
    }
    case "range": {
      const start = t.months[(Number(mapMonth(field.start ?? "1")) - 1 + 12) % 12];
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
function describeDayOfMonth(field, t) {
  switch (field.kind) {
    case "any":
    case "question":
      return "";
    case "list": {
      const listText = formatList(field.values ?? [], t);
      if (t === LOCALE_PACKS["pt-BR"]) {
        return `${t.dayPlural} ${listText} do m\xEAs`;
      }
      return `${t.dayPlural} ${listText} ${t.ofMonth}`;
    }
    case "range":
      return `${t.dayWord} ${field.start}${t.through}${field.end}`;
    case "step":
      return describeStep(field.base, field.step, t.dayPlural, t);
    case "weekdayNearest":
      return `${t.weekdayNearest} ${field.base}`;
    case "lastWeekday": {
      if (field.base) {
        const weekday = mapDay(field.base);
        const name = typeof weekday === "number" ? t.days[weekday] : String(weekday);
        return t.lastWeekdayOfMonth(name);
      }
      return t.weekdayLast;
    }
    case "last":
      return t.lastDayOfMonth;
    case "literal":
      if (t === LOCALE_PACKS["pt-BR"]) {
        if (field.raw === "1") {
          return "primeiro dia do m\xEAs";
        }
        return `${t.dayWord} ${field.raw} do m\xEAs`;
      }
      return `${t.dayWord} ${field.raw} ${t.ofMonth}`;
    default:
      return field.raw;
  }
}
function describeDayOfWeek(field, t) {
  const mapName = (v) => t.days[(Number(mapDay(v)) + 7) % 7];
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
        const withFeira = (name) => ["segunda", "ter\xE7a", "quarta", "quinta", "sexta"].includes(name) ? `${name}-feira` : name;
        const startWord = ["segunda", "ter\xE7a", "quarta", "quinta", "sexta"].includes(lowerStart) ? lowerStart : withFeira(lowerStart);
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
      const weekday = field.base ? mapName(field.base) : void 0;
      if (weekday) {
        if (t === LOCALE_PACKS["pt-BR"]) {
          const lower = weekday.toLowerCase();
          const withFeira = ["segunda", "ter\xE7a", "quarta", "quinta", "sexta"].includes(lower) ? `${lower}-feira` : lower;
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
function describeDayOfWeekListNatural(field, t) {
  const mapName = (v) => t.days[(Number(mapDay(v)) + 7) % 7];
  const names = field.values?.map(mapName) ?? [];
  if (t === LOCALE_PACKS["pt-BR"]) {
    const transformed = names.map((name) => {
      const lower = name.toLowerCase();
      if (["segunda", "ter\xE7a", "quarta", "quinta", "sexta"].includes(lower)) {
        return `${lower}s-feiras`;
      }
      return `${lower}s`;
    });
    return formatList(transformed, t);
  }
  return formatList(names, t);
}
function describeTime(parts, t) {
  const secField = parts.seconds ? parseField(parts.seconds) : void 0;
  const minField = parseField(parts.minutes);
  const hourField = parseField(parts.hours);
  if (secField && secField.kind === "step" && minField.kind === "any" && hourField.kind === "any") {
    return t.everySecond(secField.step ?? "1");
  }
  if (minField.kind === "step" && hourField.kind === "any") {
    return t.everyMinute(minField.step ?? "1");
  }
  if (hourField.kind === "step" && minField.kind === "literal" && (!secField || secField.kind !== "literal")) {
    const minute = Number(minField.raw);
    const every = t.everyHour(hourField.step ?? "1");
    const minutePhrase = t === LOCALE_PACKS["pt-BR"] ? `no minuto ${pad2(minute)}` : `${t.at} ${t.minutesPastHour(minute)}`;
    const baseHour = Number(hourField.base ?? hourField.raw ?? 0);
    const startHour = Number.isNaN(baseHour) ? 0 : baseHour;
    const startTime = t.formatTimeVerbose?.(startHour, 0) ?? t.formatTime(startHour, 0);
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
  const minutes = minField.kind === "list" ? minField.values ?? [] : [minField.raw];
  const hours = hourField.kind === "list" ? hourField.values ?? [] : [hourField.raw];
  const fixedHour = hourField.kind === "literal" || hourField.kind === "list";
  const fixedMinute = minField.kind === "literal" || minField.kind === "list";
  if (minField.kind === "literal" && hourField.kind === "range") {
    const minute = Number(minField.raw);
    const startHour = Number(hourField.start ?? 0);
    const endHour = Number(hourField.end ?? startHour);
    const every = t.everyHour("1");
    if (t === LOCALE_PACKS["pt-BR"]) {
      const startText2 = minute === 0 ? `${startHour}h` : `${startHour}h${pad2(minute)}`;
      const endText2 = `${endHour}h59`;
      return `${capitalizeFirst(every)}, entre ${startText2} e ${endText2}`;
    }
    const startText = t.formatTime(startHour, minute);
    const endText = t.formatTime(endHour, 59);
    return `${capitalizeFirst(every)}, between ${startText} and ${endText}`;
  }
  if (minField.kind === "step" && fixedHour) {
    const step = minField.step ?? "1";
    if (hours.length === 1) {
      const hourNum = Number(hours[0]);
      const start = t.formatTime(hourNum, 0);
      const end = t.formatTime(hourNum, 59);
      const every2 = `${t.everyMinute(step)}`;
      const between = t === LOCALE_PACKS["pt-BR"] ? `entre ${start} e ${end}` : `between ${start} and ${end}`;
      return `${capitalizeFirst(every2)}, ${between}`;
    }
    const startTimes = hours.map((h) => t.formatTime(Number(h), 0));
    const every = `${t.everyMinute(step)}`;
    const atHours = t === LOCALE_PACKS["pt-BR"] ? `\xE0s ${formatList(startTimes, t)}` : `${t.at} ${formatList(startTimes, t)}`;
    return `${capitalizeFirst(every)}, ${atHours}`;
  }
  if (fixedHour && fixedMinute) {
    const combos = [];
    hours.forEach((h) => {
      minutes.forEach((m) => {
        const hourNum = Number(h);
        const minuteNum = Number(m);
        const useVerbose = t === LOCALE_PACKS["pt-BR"] && hourNum > 0 && hourNum < 12 && minuteNum !== 0 ? true : t === LOCALE_PACKS["pt-BR"] && hourNum > 0 && hourNum < 12 && minuteNum === 0 ? true : false;
        const formatter = useVerbose ? t.formatTimeVerbose ?? t.formatTime : t.formatTime;
        combos.push(formatter(hourNum, minuteNum));
      });
    });
    return `${capitalizeFirst(t.at)} ${formatList(combos, t)}`;
  }
  if (fixedHour && minField.kind === "any") {
    const hoursText = formatList(
      hours.map((h) => pad2(h)),
      t
    );
    return `${t.everyHour("1")} ${t.at} ${hoursText}${t.timeSeparator}${pad2(0)}`;
  }
  return "";
}
function describeYear(field, t) {
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
function joinParts(parts, t) {
  const filtered = parts.filter((p) => p?.trim());
  if (filtered.length === 0) {
    return "";
  }
  if (filtered.length === 1) {
    return filtered[0];
  }
  if (filtered.length === 2 && t === LOCALE_PACKS["pt-BR"] && filtered[1].trim().startsWith("de ")) {
    return `${filtered[0]}, ${filtered[1]}`;
  }
  if (filtered.length === 2 && t === LOCALE_PACKS["pt-BR"] && filtered[1].trim().toLowerCase().startsWith("a cada")) {
    return `${filtered[0]}, ${filtered[1]}`;
  }
  if (filtered.length === 2 && t === LOCALE_PACKS["pt-BR"] && filtered[1].trim().startsWith("\xC0")) {
    return `${filtered[0]}, ${filtered[1]}`;
  }
  if (filtered.length === 2 && t === LOCALE_PACKS["pt-BR"] && filtered[1].trim().toLowerCase().startsWith("somente")) {
    return `${filtered[0]}, ${filtered[1]}`;
  }
  if (filtered.length >= 2 && t === LOCALE_PACKS["pt-BR"] && filtered[filtered.length - 1].trim().toLowerCase().startsWith("somente")) {
    const last2 = filtered.pop();
    return `${filtered.join(", ")}, ${last2}`;
  }
  if (filtered.length === 2 && t !== LOCALE_PACKS["pt-BR"]) {
    return `${filtered[0]}, ${filtered[1]}`;
  }
  const last = filtered.pop();
  return `${filtered.join(", ")}${t.andWord}${last}`;
}

// src/core/normalize-cron.ts
function normalizeCron(expr) {
  const clean = expr.trim().replace(/["']/g, "").replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();
  const parts = clean.split(" ");
  if (parts.length < 5) {
    throw new Error("Cron expression must have at least 5 fields");
  }
  if (parts.length === 5) {
    const [m2, h2, dom2, mon2, dow2] = parts;
    return {
      seconds: void 0,
      minutes: m2,
      hours: h2,
      dayOfMonth: dom2,
      month: mon2,
      dayOfWeek: dow2,
      year: void 0
    };
  }
  if (parts.length === 6) {
    const [s2, m2, h2, dom2, mon2, dow2] = parts;
    return {
      seconds: s2,
      minutes: m2,
      hours: h2,
      dayOfMonth: dom2,
      month: mon2,
      dayOfWeek: dow2,
      year: void 0
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
    year: y
  };
}

// src/core/cronus.ts
function buildDayLayer(locale, dayOfMonthText, dayOfWeekText, monthText, yearText, hasEveryMonth, hasEveryYear) {
  const t = resolveLocalePack(locale);
  const pieces = [];
  const hasDayOfMonth = Boolean(dayOfMonthText);
  const hasDayOfWeek = Boolean(dayOfWeekText);
  if (hasDayOfMonth) {
    const monthSegment = !hasEveryMonth && monthText ? monthText : "";
    if (locale === "pt-BR") {
      const preposition = dayOfMonthText.startsWith(t.dayPlural) ? "nos" : dayOfMonthText.startsWith("primeiro dia") ? t.on : "do";
      pieces.push(`${preposition} ${dayOfMonthText}`.trim());
      if (monthSegment) {
        pieces.push(`somente em ${monthSegment}`.trim());
      }
    } else {
      pieces.push(`on ${dayOfMonthText}`.trim());
      if (monthSegment) {
        pieces.push(`only in ${monthSegment}`.trim());
      }
    }
  } else if (!hasEveryMonth && monthText) {
    pieces.push(`${t.in} ${monthText}`.trim());
  }
  if (hasDayOfWeek) {
    if (locale === "pt-BR") {
      const lower = dayOfWeekText.toLowerCase();
      const weekdayWord = ["segunda", "ter\xE7a", "quarta", "quinta", "sexta"].includes(lower) ? `${lower}s-feiras` : lower.endsWith("o") ? `${lower}s` : lower;
      const prefix = hasDayOfMonth ? "de" : "somente \xE0s";
      pieces.push(`${prefix} ${weekdayWord}`.trim());
    } else {
      const phrase = hasDayOfMonth ? `on ${dayOfWeekText}` : `only on ${dayOfWeekText}`;
      pieces.push(phrase.trim());
    }
  }
  if (yearText) {
    if (hasEveryYear) {
      pieces.push(yearText.trim());
    } else {
      pieces.push(`${t.in} ${yearText}`.trim());
    }
  }
  return pieces;
}
function translate(expr, locale = "pt-BR") {
  const t = resolveLocalePack(locale);
  const normalized = normalizeCron(expr);
  const timeLayer = describeTime(normalized, t);
  const monthField = parseField(normalized.month);
  const dayOfMonthField = parseField(normalized.dayOfMonth);
  const dayOfWeekField = parseField(normalized.dayOfWeek);
  const yearField = normalized.year ? parseField(normalized.year) : void 0;
  const dayOfWeekText = dayOfWeekField.kind === "list" && (dayOfWeekField.values?.length ?? 0) > 1 ? describeDayOfWeekListNatural(dayOfWeekField, t) : describeDayOfWeek(dayOfWeekField, t);
  const monthText = describeMonth(monthField, t);
  const hasEveryMonth = monthText === t.everyMonth;
  const dayOfMonthText = describeDayOfMonth(dayOfMonthField, t);
  const yearText = describeYear(yearField, t);
  const hasEveryYear = yearText === t.everyYear;
  const dayLayers = buildDayLayer(
    locale,
    dayOfMonthText,
    dayOfWeekText,
    monthText,
    yearText,
    hasEveryMonth,
    hasEveryYear
  );
  const parts = [timeLayer, ...dayLayers];
  const sentence = joinParts(parts, t).trim();
  return capitalizeFirst(sentence || timeLayer || "");
}
var INTERNALS = Object.freeze({
  normalizeCron,
  parseField,
  describeTime,
  describeMonth,
  describeDayOfMonth,
  describeDayOfWeek,
  describeDayOfWeekListNatural,
  describeYear,
  joinParts,
  translate
});
var Cronus = class {
  static translate(expr, locale = "pt-BR") {
    return translate(expr, locale);
  }
  static get internals() {
    return INTERNALS;
  }
};
export {
  Cronus,
  LOCALE_PACKS,
  resolveLocalePack
};
