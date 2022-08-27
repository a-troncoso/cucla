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
      <Text style={styles.buttonText}>{children}</Text>
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
    color: colors.white,
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
});

export default Button;
