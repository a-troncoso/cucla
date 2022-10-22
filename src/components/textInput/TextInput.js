import React, {useState, useEffect, forwardRef} from 'react';
import {StyleSheet, TextInput as RNTextInput} from 'react-native';
import numeral from 'numeral';
import {colors} from 'utils/colors';

const TextInput = forwardRef(
  (
    {
      autoFocus,
      blurOnSubmit,
      keyboardType,
      value,
      format,
      onChangeText,
      onSubmitEditing,
    },
    ref,
  ) => {
    const [mask, setMask] = useState('');

    const handleChangeText = text => {
      let newValue = text;

      if (keyboardType === 'numeric' && format)
        newValue = numeral(text).value();

      onChangeText(newValue);
    };

    const valueEffect = () => {
      if (keyboardType === 'numeric' && format) {
        const m = numeral(value).format(format);
        setMask(m);
      }
    };

    useEffect(valueEffect, [value]);

    return (
      <RNTextInput
        autoFocus={autoFocus}
        blurOnSubmit={blurOnSubmit}
        keyboardType={keyboardType}
        ref={ref}
        style={styles.textInput}
        value={mask}
        onChangeText={handleChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    );
  },
);

const styles = StyleSheet.create({
  textInput: {
    paddingLeft: 40,
    fontSize: 40,
    color: colors.white,
    textAlign: 'center',
  },
});

export default TextInput;
