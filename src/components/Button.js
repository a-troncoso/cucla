import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from 'utils/colors';

const Button = ({children, disabled = false, onPress = () => {}}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.buttonDisabled : styles.buttonEnabled,
      ]}
      disabled={disabled}
      onPress={onPress}>
      <Text
        style={[
          styles.buttonText,
          disabled ? styles.textButtonDisabled : styles.textButtonEnabled,
        ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 296,
    height: 45,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 24,
    lineHeight: 30,
    textAlign: 'center',
  },
  buttonEnabled: {
    backgroundColor: colors.secondary,
  },
  buttonDisabled: {
    backgroundColor: 'transparent',
  },
  textButtonEnabled: {
    color: colors.white,
  },
  textButtonDisabled: {
    color: colors.disabled,
  },
});

export default Button;
