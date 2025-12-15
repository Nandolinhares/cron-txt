type LocaleKey = "pt-BR" | "en" | string;
type LocalePack = {
    days: string[];
    months: string[];
    monthWord: string;
    dayPlural: string;
    everyDay: string;
    every: string;
    at: string;
    onlyOn: string;
    on: string;
    in: string;
    andWord: string;
    through: string;
    minutesPastHour: (minute: number) => string;
    startingAt: string;
    everyMinute: (step: string) => string;
    everyHour: (step: string) => string;
    everySecond: (step: string) => string;
    everyMonth: string;
    everyYear: string;
    ofMonth: string;
    dayWord: string;
    weekdayNearest: string;
    weekdayLast: string;
    lastDayOfMonth: string;
    nthWeekday: (n: string, weekday: string) => string;
    lastWeekdayOfMonth: (weekday: string) => string;
    listFormatter: (items: string[]) => string;
    timeSeparator: string;
    formatTime: (hour: number, minute: number) => string;
    formatTimeVerbose?: (hour: number, minute: number) => string;
};
type FieldKind = "any" | "literal" | "list" | "range" | "step" | "last" | "weekdayNearest" | "lastWeekday" | "nthWeekday" | "question";
type ParsedField = {
    kind: FieldKind;
    raw: string;
    values?: string[];
    start?: string;
    end?: string;
    step?: string;
    base?: string;
    nth?: string;
};
type NormalizedCron = {
    seconds?: string;
    minutes: string;
    hours: string;
    dayOfMonth: string;
    month: string;
    dayOfWeek: string;
    year?: string;
};

declare function describeMonth(field: ParsedField, t: LocalePack): string;
declare function describeDayOfMonth(field: ParsedField, t: LocalePack): string;
declare function describeDayOfWeek(field: ParsedField, t: LocalePack): string;
declare function describeTime(parts: NormalizedCron, t: LocalePack): string;
declare function describeYear(field: ParsedField | undefined, t: LocalePack): string;

declare function normalizeCron(expr: string): NormalizedCron;

declare function parseField(raw: string): ParsedField;

declare function cronToReadable(expr: string, locale?: LocaleKey): string;
declare const __cronReadableInternals: {
    normalizeCron: typeof normalizeCron;
    parseField: typeof parseField;
    describeMonth: typeof describeMonth;
    describeDayOfMonth: typeof describeDayOfMonth;
    describeDayOfWeek: typeof describeDayOfWeek;
    describeTime: typeof describeTime;
    describeYear: typeof describeYear;
};

declare const LOCALE_PACKS: Record<LocaleKey, LocalePack>;
declare function resolveLocalePack(locale: LocaleKey): LocalePack;

export { type FieldKind, LOCALE_PACKS, type LocaleKey, type LocalePack, type NormalizedCron, type ParsedField, __cronReadableInternals, cronToReadable, resolveLocalePack };
