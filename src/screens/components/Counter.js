/**
 * Sample React Native Counter Component
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {thousandFormat, toCurrencyFormat} from 'generic/utils/number';

const Counter = ({value, style}) => {
  return (
    <View style={[styles.mainView, style]}>
      <Text style={styles.currencySymbol}>$</Text>
      <Text style={styles.counterText}>{thousandFormat(value)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  currencySymbol: {
    fontSize: 74,
    marginRight: 10,
    color: 'gray',
  },
  counterText: {
    fontSize: 60,
  },
});

export default Counter;
