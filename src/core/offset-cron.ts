import { NormalizedCron } from '../types';
import { parseField } from './parse-field';

function wrap(value: number, min: number, max: number): number {
  const range = max - min + 1;
  let v = value;
  while (v < min) v += range;
  while (v > max) v -= range;
  return v;
}

function offsetField(raw: string, delta: number, min: number, max: number): string {
  const field = parseField(raw);
  switch (field.kind) {
    case 'any':
    case 'question':
      return raw;
    case 'literal': {
      const n = Number(field.raw);
      if (Number.isNaN(n)) return raw;
      return String(wrap(n + delta, min, max));
    }
    case 'list': {
      const vals = (field.values ?? []).map((v) => {
        const n = Number(v);
        return Number.isNaN(n) ? v : String(wrap(n + delta, min, max));
      });
      return vals.join(',');
    }
    case 'range': {
      const s = Number(field.start ?? '0');
      const e = Number(field.end ?? '0');
      if (Number.isNaN(s) || Number.isNaN(e)) return raw;
      const ns = wrap(s + delta, min, max);
      const ne = wrap(e + delta, min, max);
      return `${ns}-${ne}`;
    }
    case 'step': {
      // Offset apenas na base quando for numérica; step permanece.
      const baseNum = Number(field.base ?? field.raw);
      if (Number.isNaN(baseNum)) return raw;
      const nb = wrap(baseNum + delta, min, max);
      return `${nb}/${field.step}`;
    }
    default:
      return raw;
  }
}

/**
 * Apply hour or minute offsets to a normalized cron expression, wrapping values as needed.
 */
export function applyOffset(
  cron: NormalizedCron,
  opts: { hours?: number; minutes?: number },
): NormalizedCron {
  const hDelta = opts.hours ?? 0;
  const mDelta = opts.minutes ?? 0;

  const hours = hDelta ? offsetField(cron.hours, hDelta, 0, 23) : cron.hours;
  const minutes = mDelta ? offsetField(cron.minutes, mDelta, 0, 59) : cron.minutes;

  // Não altera demais campos.
  return {
    seconds: cron.seconds,
    minutes,
    hours,
    dayOfMonth: cron.dayOfMonth,
    month: cron.month,
    dayOfWeek: cron.dayOfWeek,
    year: cron.year,
  };
}
