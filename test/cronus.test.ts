import { describe, it, expect } from 'vitest';
import { Cronus } from '../src';

const cases = [
  {
    expr: '*/15 0 1,15 * 1-5',
    pt: 'A cada 15 minutos, entre 00h00 e 00h59, nos dias 1 e 15 do mês, de segunda a sexta-feira',
    en: 'Every 15 minutes, between 12:00 AM and 12:59 AM, on days 1 and 15 of the month, Monday through Friday',
  },
  {
    expr: '0 12 * * MON-FRI',
    pt: 'Às 12h00, de segunda a sexta-feira',
    en: 'At 12:00 PM, Monday through Friday',
  },
  {
    expr: '30 12,15,18,21 * * TUE,THU',
    pt: 'Às 12h30, 15h30, 18h30 e 21h30, somente às terças-feiras e quintas-feiras',
    en: 'At 12:30 PM, 03:30 PM, 06:30 PM and 09:30 PM, only on Tuesday and Thursday',
  },
  {
    expr: '0 0 1 1 *',
    pt: 'Às 00h00, no primeiro dia do mês, somente em janeiro',
    en: 'At 12:00 AM, on day 1 of the month and only in January',
  },
  {
    expr: '0 6 1 JAN *',
    pt: 'Às 6h da manhã, no primeiro dia do mês, somente em janeiro',
    en: 'At 06:00 AM, on day 1 of the month and only in January',
  },
  {
    expr: '0 0 25 DEC *',
    pt: 'Às 00h00, do dia 25 do mês, somente em dezembro',
    en: 'At 12:00 AM, on day 25 of the month and only in December',
  },
  {
    expr: '0 0 * * SUN',
    pt: 'Às 00h00, somente aos domingos',
    en: 'At 12:00 AM, only on Sunday',
  },
  {
    expr: '0 9-17 * * MON',
    pt: 'A cada hora, entre 9h e 17h59, somente às segundas-feiras',
    en: 'Every hour, between 09:00 AM and 05:59 PM, only on Monday',
  },
  {
    expr: '0 0 L * *',
    pt: 'Às 00h00, do último dia do mês',
    en: 'At 12:00 AM, on last day of the month',
  },
  {
    expr: '0 0 1W * *',
    pt: 'Às 00h00, do dia útil mais próximo de 1',
    en: 'At 12:00 AM, on weekday nearest to 1',
  },
  {
    expr: '0 0 * * 0',
    pt: 'Às 00h00, somente aos domingos',
    en: 'At 12:00 AM, only on Sunday',
  },
  {
    expr: '0 0 29 2 *',
    pt: 'Às 00h00, do dia 29 do mês, somente em fevereiro',
    en: 'At 12:00 AM, on day 29 of the month and only in February',
  },
  {
    expr: '*/5 * * * *',
    pt: 'A cada 5 minutos',
    en: 'Every 5 minutes',
  },
];

describe('Cronus.translate', () => {
  it('matches Portuguese outputs', () => {
    for (const c of cases) {
      expect(Cronus.translate({ expression: c.expr, locale: 'pt-BR' })).toBe(c.pt);
    }
  });

  it('matches English outputs', () => {
    for (const c of cases) {
      expect(Cronus.translate({ expression: c.expr, locale: 'en' })).toBe(c.en);
    }
  });

  it('handles list formatter ordering independently', () => {
    expect(Cronus.translate({ expression: '0 12 5,1 * *', locale: 'en' })).toBe(
      'At 12:00 PM, on days 5 and 1 of the month',
    );
    expect(Cronus.translate({ expression: '0 12 5,1 * *', locale: 'pt-BR' })).toBe(
      'Às 12h00, dos dias 5 e 1 do mês',
    );
  });

  it('keeps range wording for weekdays', () => {
    expect(Cronus.translate({ expression: '0 8 * * MON-FRI', locale: 'en' })).toBe(
      'At 08:00 AM, Monday through Friday',
    );
    expect(Cronus.translate({ expression: '0 8 * * MON-FRI', locale: 'pt-BR' })).toBe(
      'Às 08h00, de segunda a sexta-feira',
    );
  });

  it('applies hour offset (wrap)', () => {
    const pt = Cronus.translate({ expression: '0 12 * * *', locale: 'pt-BR', offsetHours: 14 });
    expect(pt).toMatch(/Às (02h00|2h da manhã)/);
  });

  it('offset works on lists', () => {
    const en = Cronus.translate({ expression: '0 8,16 * * *', locale: 'en', offsetHours: 10 });
    expect(en).toMatch(/At .* (06:00 PM|02:00 AM)/);
  });

  it('supports negative offset (pt-BR)', () => {
    const pt = Cronus.translate({ expression: '0 3 * * *', locale: 'pt-BR', offsetHours: -5 });
    expect(pt).toMatch(/Às 22h00|10h da noite/);
  });

  it('supports negative offset (en)', () => {
    const en = Cronus.translate({ expression: '0 1 * * *', locale: 'en', offsetHours: -3 });
    expect(en).toMatch(/At 10:00 PM|At 10:00 PM, every day/);
  });

  it('offset on hour range keeps wording', () => {
    const en = Cronus.translate({ expression: '0 9-17 * * *', locale: 'en', offsetHours: 2 });
    expect(en).toMatch(/Every hour, between .* and .*/);
  });

  it('offset on step base preserves step', () => {
    // every 2 hours at minute 15, base 1 -> shifted by +3 hours
    const pt = Cronus.translate({ expression: '15 1/2 * * *', locale: 'pt-BR', offsetHours: 3 });
    expect(pt).toMatch(/A cada 2 horas/);
  });
});
