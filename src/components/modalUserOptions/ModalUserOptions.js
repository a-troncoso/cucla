import React from 'react';
import {StyleSheet, View, Modal, FlatList} from 'react-native';
import Button from 'components/Button';
import {colors} from 'utils/colors';
import {userIdLogged} from 'src/App';

export const USER_OPTIONS = [
  {
    id: 0,
    title: 'Cambiar foto',
    name: 'changePicture',
  },
  {
    id: 1,
    title: 'Cambiar nombre',
    name: 'changeUserName',
  },
  {
    id: 2,
    title: 'Eliminar',
    name: 'removeUser',
  },
];

const ModalUserOptions = ({
  idUser,
  isVisible = false,
  onRequestClose = () => {},
  onPressOption = () => {},
}) => {
  const renderOption = ({item}) => {
    // Si el usuario a editar es el mismo loggeado, no se muestra la opción "Eliminar"
    if (item.id === 2 && userIdLogged === idUser) return;

    return (
      <Button
        onPress={() => onPressOption({optionId: item.id, name: item.name})}
        disabled={item.disabled}>
        {item.title}
      </Button>
    );
  };

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      transparent
      statusBarTranslucent
      onRequestClose={onRequestClose}>
      <View style={styles.mainView}>
        <View style={styles.topPortion} />
        <View style={styles.centerPortion}>
          <FlatList
            contentContainerStyle={styles.sourceOptionsContainer}
            data={USER_OPTIONS}
            renderItem={renderOption}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
              <View style={styles.sourceOptionsSeparator} />
            )}
          />
        </View>
        <View style={styles.bottomPortion} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
  topPortion: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.modalBackdrop,
  },
  centerPortion: {
    flex: 1,
    backgroundColor: colors.modalBackdrop,
  },
  sourceOptionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  sourceOptionsSeparator: {
    height: 24,
  },
  bottomPortion: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.modalBackdrop,
  },
});

export default ModalUserOptions;
