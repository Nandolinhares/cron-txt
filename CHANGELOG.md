# Changelog

This project follows Semantic Versioning.

## [2.0.0] - 2025-12-16

### Breaking Change

- `Cronus.translate` mudou de assinatura: agora recebe um objeto de opções `TranslateOptions` em vez de argumentos posicionais.
  - Antes: `Cronus.translate('0 12 * * *', 'en', 2)`
  - Depois: `Cronus.translate({ expression: '0 12 * * *', locale: 'en', offsetHours: 2 })`
- `Cronus.translateWithOffset` foi removida (substituída pelo novo parâmetro `offsetHours` em `translate`).

### Added

- Tipo `TranslateOptions` exportado em `src/index.ts`.
- Suporte a `offsetHours` (positivo/negativo) com wrap 0–23 aplicado a literais, listas, intervalos e base de `step` (o passo é preservado).

### Changed

- `README.md`: exemplos e API atualizados para a nova assinatura com objeto; seção de offset expandida.
- `playground.ts`: refatorado para usar a nova assinatura (função utilitária `log`).
- `test/cronus.test.ts`: atualizado para nova assinatura e casos cobrindo offset (incluindo negativo).
- `package.json`: versão `2.0.0`.

Arquivos tocados no commit:

- README.md, package.json, playground.ts, src/core/cronus.ts, src/core/offset-cron.ts, src/index.ts, src/locales/index.ts, src/types.ts, test/cronus.test.ts

## [1.1.0] - 2025-12-15

- d7d6906 fix: lint

[2.0.0]: https://github.com/Nandolinhares/cron-txt/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/Nandolinhares/cron-txt/releases/tag/v1.1.0
