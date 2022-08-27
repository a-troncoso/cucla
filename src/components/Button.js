import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from 'utils/colors';

const Button = ({children, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.white,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default Button;
