import { LocaleKey, LocalePack } from '../types';
import { pad2 } from '../utils/strings';

function ordinalSuffix(n: string): string {
  const num = Number.parseInt(n, 10);
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) {
    return 'st';
  }
  if (j === 2 && k !== 12) {
    return 'nd';
  }
  if (j === 3 && k !== 13) {
    return 'rd';
  }
  return 'th';
}

const EN_PACK: LocalePack = {
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  monthWord: 'months',
  dayPlural: 'days',
  everyDay: 'every day',
  every: 'every',
  at: 'at',
  onlyOn: 'only on',
  on: 'on',
  in: 'in',
  andWord: ' and ',
  through: ' through ',
  minutesPastHour: (minute) => `${pad2(minute)} minutes past the hour`,
  startingAt: 'starting at',
  everyMinute: (step) => `every ${step} minutes`,
  everyHour: (step) => `every ${step} hours`,
  everySecond: (step) => `every ${step} seconds`,
  everyMonth: 'every month',
  everyYear: 'every year',
  ofMonth: 'of the month',
  dayWord: 'day',
  weekdayNearest: 'weekday nearest to',
  weekdayLast: 'last weekday of the month',
  lastDayOfMonth: 'last day of the month',
  nthWeekday: (n, weekday) => `the ${n}${ordinalSuffix(n)} ${weekday} of the month`,
  lastWeekdayOfMonth: (weekday) => `last ${weekday} of the month`,
  listFormatter: (items) => {
    if (items.length === 1) {
      return items[0];
    }
    const last = items.pop();
    return `${items.join(', ')} and ${last}`;
  },
  timeSeparator: ':',
  formatTime: (hour, minute) => {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${pad2(hour12)}:${pad2(minute)} ${suffix}`;
  },
  formatTimeVerbose: (hour, minute) => {
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    return `${pad2(hour12)}:${pad2(minute)} ${suffix}`;
  },
};

export const PT_PACK: LocalePack = {
  days: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  months: [
    'janeiro',
    'fevereiro',
    'março',
    'abril',
    'maio',
    'junho',
    'julho',
    'agosto',
    'setembro',
    'outubro',
    'novembro',
    'dezembro',
  ],
  monthWord: 'meses',
  dayPlural: 'dias',
  everyDay: 'todos os dias',
  every: 'a cada',
  at: 'às',
  onlyOn: 'somente às',
  on: 'no',
  in: 'em',
  andWord: ' e ',
  through: ' até ',
  minutesPastHour: (minute) => `${minute} minutos de cada hora`,
  startingAt: 'a partir de',
  everyMinute: (step) => `a cada ${step} minutos`,
  everyHour: (step) => `a cada ${step} horas`,
  everySecond: (step) => `a cada ${step} segundos`,
  everyMonth: 'todos os meses',
  everyYear: 'todos os anos',
  ofMonth: 'do mês',
  dayWord: 'dia',
  weekdayNearest: 'dia útil mais próximo de',
  weekdayLast: 'último dia útil do mês',
  lastDayOfMonth: 'último dia do mês',
  nthWeekday: (n, weekday) => `${n}º ${weekday} do mês`,
  lastWeekdayOfMonth: (weekday) => `última ${weekday} do mês`,
  listFormatter: (items) => {
    if (items.length === 1) {
      return items[0];
    }
    const last = items.pop();
    return `${items.join(', ')} e ${last}`;
  },
  timeSeparator: 'h',
  formatTime: (hour, minute) => `${pad2(hour)}h${pad2(minute)}`,
  formatTimeVerbose: (hour, minute) => {
    const h = String(hour);
    const base = minute === 0 ? `${h}h` : `${h}h${pad2(minute)}`;
    if (hour < 12) {
      return `${base} da manhã`;
    }
    if (hour < 18) {
      return `${base} da tarde`;
    }
    return `${base} da noite`;
  },
};

export const LOCALE_PACKS: Record<LocaleKey, LocalePack> = {
  'pt-BR': PT_PACK,
  en: EN_PACK,
  'en-US': EN_PACK,
};

/** Get a locale pack by key, defaulting to pt-BR when missing. */
export function resolveLocalePack(locale: LocaleKey): LocalePack {
  return LOCALE_PACKS[locale] ?? LOCALE_PACKS['pt-BR'];
}
