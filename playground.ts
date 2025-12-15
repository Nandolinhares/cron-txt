/* eslint-disable no-undef */
import './src/';
import { Cronus } from './src/';

console.log('Executando o playground.ts');

console.log(Cronus.translate('*/15 0 1,15 * 1-5', 'pt-BR'));
console.log(Cronus.translate('*/15 0 1,15 * 1-5', 'en'));
console.log(Cronus.translate('0 12 * * MON-FRI', 'pt-BR'));
console.log(Cronus.translate('0 12 * * MON-FRI', 'pt-BR', -2));
console.log(Cronus.translate('0 12 * * MON-FRI', 'en'));
console.log(Cronus.translate('30 12,15,18,21 * * TUE,THU', 'pt-BR'));
console.log(Cronus.translate('30 12,15,18,21 * * TUE,THU', 'pt-BR', -3));
console.log(Cronus.translate('30 12,15,18,21 * * TUE,THU', 'en'));
console.log(Cronus.translate('0 0 1 1 *', 'pt-BR'));
console.log(Cronus.translate('0 0 1 1 *', 'en'));
console.log(Cronus.translate('0 6 1 JAN *', 'en'));
console.log(Cronus.translate('0 6 1 JAN *', 'pt-BR'));
console.log(Cronus.translate('0 0 25 DEC *', 'pt-BR'));
console.log(Cronus.translate('0 0 25 DEC *', 'en'));
console.log(Cronus.translate('0 0 * * SUN', 'pt-BR'));
console.log(Cronus.translate('0 0 * * SUN', 'en'));
console.log(Cronus.translate('0 9-17 * * MON', 'pt-BR'));
console.log(Cronus.translate('0 9-17 * * MON', 'en'));
console.log(Cronus.translate('0 0 L * *', 'pt-BR'));
console.log(Cronus.translate('0 0 L * *', 'en'));
console.log(Cronus.translate('0 0 1W * *', 'pt-BR'));
console.log(Cronus.translate('0 0 1W * *', 'en'));
console.log(Cronus.translate('0 0 * * 0', 'pt-BR'));
console.log(Cronus.translate('0 0 * * 0', 'en'));
console.log(Cronus.translate('0 0 29 2 *', 'pt-BR'));
console.log(Cronus.translate('0 0 29 2 *', 'en'));
console.log(Cronus.translate('*/5 * * * *', 'pt-BR'));
console.log(Cronus.translate('*/5 * * * *', 'en'));
