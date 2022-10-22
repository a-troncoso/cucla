import React from 'react';
import {StatusBar, StyleSheet, View, Text} from 'react-native';
import {colors} from 'utils/colors';

const EmptyAccounts = () => {
  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor={colors.primary} />

      <View style={styles.emptyAccountTextWrapper}>
        <Text style={styles.emptyAccountText}>
          Aún no has agregado usuarios
        </Text>
        <Text style={styles.emptyAccountText}>
          Presiona en el ícono agregar usuario
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  emptyAccountTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyAccountText: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
  },
});

export default EmptyAccounts;
