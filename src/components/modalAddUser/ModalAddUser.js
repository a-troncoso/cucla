import React from 'react';
import {StyleSheet, View, Modal, TextInput} from 'react-native';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import ModalImageSourceOptions from 'components/modalImageSourceOptions/ModalImageSourceOptions';
import useModalAddUser from './useModalAddUser';
import {colors} from 'utils/colors';

const ModalAddUser = ({isVisible, onAddUser, onRequestClose}) => {
  const {
    userName,
    newImage,
    isVisibleModalImageSourceOptions,
    inputRef,
    isDisabledSaveBtn,
    handleShowModal,
    handleAddUser,
    handleChangeUserName,
    handlePressAvatar,
    handleRequestCloseModalImageSourceOptions,
    handleSelectNewImage,
  } = useModalAddUser({onAddUser});

  return (
    <View>
      <Modal
        visible={isVisible}
        animationType="slide"
        onShow={handleShowModal}
        onRequestClose={onRequestClose}>
        <View style={styles.mainView}>
          <View style={styles.topPortion}>
            <Avatar image={newImage} onPress={handlePressAvatar} />
            <View style={styles.inputView}>
              <TextInput
                style={styles.textInputAmount}
                ref={inputRef}
                blurOnSubmit={false}
                placeholder="Nombre del usuario"
                placeholderTextColor={colors.disabled}
                textAlign="center"
                value={userName}
                onChangeText={handleChangeUserName}
                onSubmitEditing={handleAddUser}
              />
            </View>
          </View>
          <View style={styles.bottomPortion}>
            <Button onPress={handleAddUser} disabled={isDisabledSaveBtn}>
              Guardar
            </Button>
          </View>
        </View>
      </Modal>

      <ModalImageSourceOptions
        isVisible={isVisibleModalImageSourceOptions}
        onRequestClose={handleRequestCloseModalImageSourceOptions}
        onSelectNewImage={handleSelectNewImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingBottom: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  topPortion: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomPortion: {
    alignItems: 'center',
  },
  inputView: {
    width: 300,
    marginTop: 32,
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
  },
  textInputAmount: {
    fontSize: 32,
    color: colors.white,
  },
});

export default ModalAddUser;
