import numeral from 'numeral';

const _regExp = new RegExp(/(\d)(?=(\d{3})+(?!\d))/, 'g');

const _formatFloat = amount =>
  String(amount).replace('.', ',').replace(_regExp, '$1.');

const _cleanFormat = (amount, decimal = false) =>
  decimal ? _formatFloat(amount) : thousandFormat(amount);

export const toCurrencyFormat = (amount, decimal) =>
  `$ ${_cleanFormat(amount, decimal)}`;

export const extractNumbers = value => {
  return value ? +value.toString().match(/\d+/g).join('') : 0;
};

export const thousandFormat = (number, decimals) => {
  if (decimals) {
    const format = `0,0.${'0'.repeat(decimals)}`;
    return numeral(number).format(format);
  }
  return numeral(number).format('0,0');
};
