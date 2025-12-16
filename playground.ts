/* eslint-disable no-undef */
import './src/';
import { Cronus } from './src/';

console.log('Executando o playground.ts');

const log = (expression: string, locale: string, offsetHours?: number) =>
  console.log(Cronus.translate({ expression, locale, offsetHours }));

log('*/15 0 1,15 * 1-5', 'pt-BR');
log('*/15 0 1,15 * 1-5', 'en');
log('0 12 * * MON-FRI', 'pt-BR');
log('0 12 * * MON-FRI', 'pt-BR', -2);
log('0 12 * * MON-FRI', 'en');
log('30 12,15,18,21 * * TUE,THU', 'pt-BR');
log('30 12,15,18,21 * * TUE,THU', 'pt-BR', -3);
log('30 12,15,18,21 * * TUE,THU', 'en');
log('0 0 1 1 *', 'pt-BR');
log('0 0 1 1 *', 'en');
log('0 6 1 JAN *', 'en');
log('0 6 1 JAN *', 'pt-BR');
log('0 0 25 DEC *', 'pt-BR');
log('0 0 25 DEC *', 'en');
log('0 0 * * SUN', 'pt-BR');
log('0 0 * * SUN', 'en');
log('0 9-17 * * MON', 'pt-BR');
log('0 9-17 * * MON', 'en');
log('0 0 L * *', 'pt-BR');
log('0 0 L * *', 'en');
log('0 0 1W * *', 'pt-BR');
log('0 0 1W * *', 'en');
log('0 0 * * 0', 'pt-BR');
log('0 0 * * 0', 'en');
log('0 0 29 2 *', 'pt-BR');
log('0 0 29 2 *', 'en');
log('*/5 * * * *', 'pt-BR');
log('*/5 * * * *', 'en');
