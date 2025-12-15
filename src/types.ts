export type LocaleKey = "pt-BR" | "en" | string;

export type LocalePack = {
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

export type FieldKind =
  | "any"
  | "literal"
  | "list"
  | "range"
  | "step"
  | "last"
  | "weekdayNearest"
  | "lastWeekday"
  | "nthWeekday"
  | "question";

export type ParsedField = {
  kind: FieldKind;
  raw: string;
  values?: string[];
  start?: string;
  end?: string;
  step?: string;
  base?: string;
  nth?: string;
};

export type NormalizedCron = {
  seconds?: string;
  minutes: string;
  hours: string;
  dayOfMonth: string;
  month: string;
  dayOfWeek: string;
  year?: string;
};
