const DOW_ALIASES: Record<string, number> = {
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
  TERÇA: 2,
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
  SÁBADO: 6,
};

const MONTH_ALIASES: Record<string, number> = {
  JAN: 1,
  JANUARY: 1,
  FEV: 2,
  FEVEREIRO: 2,
  FEB: 2,
  FEBRUARY: 2,
  MAR: 3,
  MARCH: 3,
  MARCO: 3,
  MARÇO: 3,
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
  DEZEMBRO: 12,
};

export function mapMonth(value: string): number | string {
  const upper = value.toUpperCase();
  if (MONTH_ALIASES[upper]) {
    return MONTH_ALIASES[upper];
  }
  return value;
}

export function mapDay(value: string): number | string {
  const upper = value.toUpperCase();
  if (DOW_ALIASES[upper] !== undefined) {
    return DOW_ALIASES[upper];
  }
  return value;
}
