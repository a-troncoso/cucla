import React from 'react';
import {StyleSheet, View, Modal, TextInput} from 'react-native';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import ModalImageSourceOptions from 'components/modalImageSourceOptions/ModalImageSourceOptions';
import useModalUser from './useModalUser';
import {colors} from 'utils/colors';
import {USER_OPTIONS} from '../modalUserOptions/ModalUserOptions';

export const MODAL_USER_MODES = {
  ADD: 'ADD',
  EDIT: 'EDIT',
  REMOVE: 'REMOVE',
};

const ModalUser = ({
  isVisible = false,
  mode = MODAL_USER_MODES.ADD,
  modeConfig = {
    userId: null,
    attributeToEdit: USER_OPTIONS[1].name,
  },
  onAddUser = () => {},
  onEditUser = () => {},
  onRequestClose = () => {},
}) => {
  const {
    inputRef,
    isDisabledSaveBtn,
    isVisibleModalImageSourceOptions,
    newImage,
    newUserName,
    handleSubmitEditing,
    handleChangeNewUserName,
    handlePressAvatar,
    handleRequestCloseModalImageSourceOptions,
    handleSelectNewImage,
    handleShowModal,
  } = useModalUser({mode, modeConfig, onAddUser, onEditUser});

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
                autoFocus
                blurOnSubmit={false}
                placeholder="Nombre"
                placeholderTextColor={colors.disabled}
                ref={inputRef}
                style={styles.textInputAmount}
                value={newUserName}
                onChangeText={handleChangeNewUserName}
                onSubmitEditing={handleSubmitEditing}
              />
            </View>
          </View>
          <View style={styles.bottomPortion}>
            <Button onPress={handleSubmitEditing} disabled={isDisabledSaveBtn}>
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
    textAlign: 'center',
    color: colors.white,
  },
});

export default ModalUser;
