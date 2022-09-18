import numeral from 'numeral';

numeral.register('locale', 'cl', {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'm',
    million: 'M',
    billion: 'B',
    trillion: 'T',
  },
  ordinal: function (number) {
    return number === 1 ? 'er' : 'o';
  },
  currency: {
    symbol: '$',
  },
});

numeral.locale('cl');
