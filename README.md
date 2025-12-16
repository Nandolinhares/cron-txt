# Cron-txt

Humanize cron expressions in Brazilian Portuguese (pt-BR) and English with a tiny API and natural phrasing. Turn `*/15 0 1,15 * 1-5` into:

- **pt-BR:** `A cada 15 minutos, entre 00h00 e 00h59, nos dias 1 e 15 do mês, de segunda a sexta-feira`
- **en:** `Every 15 minutes, between 12:00 AM and 12:59 AM, on days 1 and 15 of the month, Monday through Friday`

## ✨ Highlights

- Polished wording for pt-BR and en-US (no awkward "somente às").
- Supports lists, ranges, steps, last day, weekday-nearest, `LW`, `L`, `#`, `W`, optional seconds, and optional year.
- Minimal API: `Cronus.translate({ expression, locale?, offsetHours? })`.
- Ships CJS/ESM builds with typings and tests that mirror real examples.

## 🚀 Install

```bash
yarn add cron-txt
# or
npm install cron-txt
```

## 🧭 Quick start

```ts
import { Cronus } from 'cron-txt';

const every15MinutesPt = Cronus.translate({ expression: '*/15 0 1,15 * 1-5', locale: 'pt-BR' });
// "A cada 15 minutos, entre 00h00 e 00h59, nos dias 1 e 15 do mês, de segunda a sexta-feira"

const every15MinutesEn = Cronus.translate({ expression: '*/15 0 1,15 * 1-5', locale: 'en' });
// "Every 15 minutes, between 12:00 AM and 12:59 AM, on days 1 and 15 of the month, Monday through Friday"

const weekdayRange = {
  pt: Cronus.translate({ expression: '0 12 * * MON-FRI', locale: 'pt-BR' }),
  en: Cronus.translate({ expression: '0 12 * * MON-FRI', locale: 'en' }),
};
// pt → "Às 12h00, de segunda a sexta-feira"
// en → "At 12:00 PM, Monday through Friday"

const monthAndDays = {
  pt: Cronus.translate({ expression: '30 12,15,18,21 * * TUE,THU', locale: 'pt-BR' }),
  en: Cronus.translate({ expression: '30 12,15,18,21 * * TUE,THU', locale: 'en' }),
};
// pt → "Às 12h30, 15h30, 18h30 e 21h30, somente às terças-feiras e quintas-feiras"
// en → "At 12:30 PM, 03:30 PM, 06:30 PM and 09:30 PM, only on Tuesday and Thursday"

const firstOfJanuary = {
  pt: Cronus.translate({ expression: '0 6 1 JAN *', locale: 'pt-BR' }),
  en: Cronus.translate({ expression: '0 6 1 JAN *', locale: 'en' }),
};
// pt → "Às 6h da manhã, no primeiro dia do mês, somente em janeiro"
// en → "At 06:00 AM, on day 1 of the month and only in January"

const mondayHours = {
  pt: Cronus.translate({ expression: '0 9-17 * * MON', locale: 'pt-BR' }),
  en: Cronus.translate({ expression: '0 9-17 * * MON', locale: 'en' }),
};
// pt → "A cada hora, entre 9h e 17h59, somente às segundas-feiras"
// en → "Every hour, between 09:00 AM and 05:59 PM, only on Monday"
```

### Offset examples

```ts
// Add 2 hours
const shifted = Cronus.translate({ expression: '0 12 * * *', locale: 'pt-BR', offsetHours: 2 });
// "Às 14h00, todos os dias"

// Subtract 5 hours (negative offset)
const minusFive = Cronus.translate({ expression: '0 3 * * *', locale: 'pt-BR', offsetHours: -5 });
// "Às 22h00, todos os dias"

// Wrap across day
const wrapped = Cronus.translate({ expression: '0 20 * * *', locale: 'en', offsetHours: 6 });
// "At 02:00 AM, every day"

// Lists of hours adjusted with wrap
const listShift = Cronus.translate({ expression: '0 8,16 * * *', locale: 'en', offsetHours: 10 });
// "At 06:00 PM and 02:00 AM, every day"
```

## 🔎 API

```ts
Cronus.translate(options: {
  expression: string;
  locale?: 'pt-BR' | 'en' | string;
  /** Hour offset; accepts negative values and wraps 0–23. */
  offsetHours?: number;
}): string
```

- `expression`: cron expression with 5 to 7 fields (seconds and year are optional).
- `locale`: "pt-BR" (default) or "en"/"en-US".
- `offsetHours`: optional hour offset (can be negative). Applies wrap 0–23 and adjusts lists/ranges/steps bases.

### Offset examples (API signature)

```ts
Cronus.translate({ expression: '0 12 * * *', locale: 'pt-BR', offsetHours: 2 });
// → "Às 14h00, todos os dias"

Cronus.translate({ expression: '0 0 8,16 * *', locale: 'en', offsetHours: 10 });
// 08:00 and 16:00 become 06:00 PM and 02:00 AM (wrap)

// Negative offset (subtract hours)
Cronus.translate({ expression: '0 3 * * *', locale: 'pt-BR', offsetHours: -5 });
// → "Às 22h00, todos os dias"
```

### Locales

Locale packs live in `src/locales`. Add new languages by registering them in `LOCALE_PACKS`.

## 🧪 Tests

```bash
yarn test
# or
npm test
```

The suite asserts every playground example.

## 🎮 Playground

Run in watch mode to iterate on phrasing quickly:

```bash
yarn dev
```

## 🛠 Development

- Lint: `yarn lint`
- Build: `yarn build`
- Format: `yarn format`

## 📄 License

MIT
