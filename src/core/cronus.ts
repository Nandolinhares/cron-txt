import { resolveLocalePack } from '../locales';
import {
  describeDayOfMonth,
  describeDayOfWeek,
  describeDayOfWeekListNatural,
  describeMonth,
  describeTime,
  describeYear,
  joinParts,
} from './describers';
import { normalizeCron } from './normalize-cron';
import { parseField } from './parse-field';
import { applyOffset } from './offset-cron';
import { LocaleKey } from '../types';
import { capitalizeFirst } from '../utils/strings';

function buildDayLayer(
  locale: LocaleKey,
  dayOfMonthText: string,
  dayOfWeekText: string,
  monthText: string,
  yearText: string,
  hasEveryMonth: boolean,
  hasEveryYear: boolean,
): string[] {
  const t = resolveLocalePack(locale);
  const pieces: string[] = [];
  const hasDayOfMonth = Boolean(dayOfMonthText);
  const hasDayOfWeek = Boolean(dayOfWeekText);

  if (hasDayOfMonth) {
    const monthSegment = !hasEveryMonth && monthText ? monthText : '';
    if (locale === 'pt-BR') {
      const preposition = dayOfMonthText.startsWith(t.dayPlural)
        ? hasDayOfWeek
          ? 'nos'
          : 'dos'
        : dayOfMonthText.startsWith('primeiro dia')
          ? t.on
          : 'do';
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
    if (locale === 'pt-BR') {
      const lower = dayOfWeekText.toLowerCase();
      const weekdayWord = ['segunda', 'terça', 'quarta', 'quinta', 'sexta'].includes(lower)
        ? `${lower}s-feiras`
        : lower.endsWith('o')
          ? `${lower}s`
          : lower;
      const prefix = hasDayOfMonth
        ? 'de'
        : dayOfWeekText.includes(' a ')
          ? 'de'
          : weekdayWord.includes('feira')
            ? 'somente às'
            : 'somente aos';
      pieces.push(`${prefix} ${weekdayWord}`.trim());
    } else {
      const needsBare = !hasDayOfMonth && dayOfWeekText.includes('through');
      const phrase = hasDayOfMonth
        ? dayOfWeekText
        : needsBare
          ? dayOfWeekText
          : `only on ${dayOfWeekText}`;
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

function translate(expr: string, locale: LocaleKey = 'pt-BR', offsetHours?: number): string {
  const t = resolveLocalePack(locale);
  const base = normalizeCron(expr);
  const normalized = typeof offsetHours === 'number' ? applyOffset(base, { hours: offsetHours }) : base;

  const timeLayer = describeTime(normalized, t);

  const monthField = parseField(normalized.month);
  const dayOfMonthField = parseField(normalized.dayOfMonth);
  const dayOfWeekField = parseField(normalized.dayOfWeek);
  const yearField = normalized.year ? parseField(normalized.year) : undefined;

  const dayOfWeekText =
    dayOfWeekField.kind === 'list' && (dayOfWeekField.values?.length ?? 0) > 1
      ? describeDayOfWeekListNatural(dayOfWeekField, t)
      : describeDayOfWeek(dayOfWeekField, t);

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
    hasEveryYear,
  );

  const parts = [timeLayer, ...dayLayers];
  const sentence = joinParts(parts, t).trim();
  return capitalizeFirst(sentence || timeLayer || '');
}

const INTERNALS = Object.freeze({
  normalizeCron,
  parseField,
  describeTime,
  describeMonth,
  describeDayOfMonth,
  describeDayOfWeek,
  describeDayOfWeekListNatural,
  describeYear,
  joinParts,
  translate,
});

export class Cronus {
  static translate(expr: string, locale: LocaleKey = 'pt-BR', offsetHours?: number): string {
    return translate(expr, locale, offsetHours);
  }

  static get internals() {
    return INTERNALS;
  }
}

export { translate as _translateInternal };
