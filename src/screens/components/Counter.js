/**
 * Sample React Native Counter Component
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {thousandFormat} from 'generic/utils/number';

const Counter = ({value, style, onPress = () => {}}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.mainView, style]}>
        <Text style={styles.currencySymbol}>$</Text>
        <Text style={styles.counterText}>{thousandFormat(value)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainView: {
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
