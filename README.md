# Cronus

Humanize cron expressions in Brazilian Portuguese (pt-BR) and English with a tiny API and natural phrasing. Turn `*/15 0 1,15 * 1-5` into:

- **pt-BR:** `A cada 15 minutos, entre 00h00 e 00h59, nos dias 1 e 15 do mês, de segunda a sexta-feira`
- **en:** `Every 15 minutes, between 12:00 AM and 12:59 AM, on days 1 and 15 of the month, Monday through Friday`

## ✨ Highlights

- Polished wording for pt-BR and en-US (no awkward "somente às").
- Supports lists, ranges, steps, last day, weekday-nearest, `LW`, `L`, `#`, `W`, optional seconds, and optional year.
- Minimal API: `Cronus.translate(expr, locale?)`.
- Ships CJS/ESM builds with typings and tests that mirror real examples.

## 🚀 Install

```bash
yarn add cronus
# or
npm install cronus
```

## 🧭 Quick start

```ts
import { Cronus } from 'cron-txt';

console.log(Cronus.translate('*/15 0 1,15 * 1-5', 'pt-BR'));
// A cada 15 minutos, entre 00h00 e 00h59, nos dias 1 e 15 do mês, de segunda a sexta-feira

console.log(Cronus.translate('*/15 0 1,15 * 1-5', 'en'));
// Every 15 minutes, between 12:00 AM and 12:59 AM, on days 1 and 15 of the month, Monday through Friday
```

### More examples

- `0 12 * * MON-FRI` → `Às 12h00, de segunda a sexta-feira` / `At 12:00 PM, Monday through Friday`
- `30 12,15,18,21 * * TUE,THU` → `Às 12h30, 15h30, 18h30 e 21h30, somente às terças-feiras e quintas-feiras` / `At 12:30 PM, 03:30 PM, 06:30 PM and 09:30 PM, only on Tuesday and Thursday`
- `0 6 1 JAN *` → `Às 6h da manhã, no primeiro dia do mês, somente em janeiro` / `At 06:00 AM, on day 1 of the month and only in January`
- `0 9-17 * * MON` → `A cada hora, entre 9h e 17h59, somente às segundas-feiras` / `Every hour, between 09:00 AM and 05:59 PM, only on Monday`

## 🔎 API

```ts
Cronus.translate(expr: string, locale?: "pt-BR" | "en"): string
```

- `expr`: cron expression with 5 to 7 fields (seconds and year are optional).
- `locale`: "pt-BR" (default) or "en"/"en-US".

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
