import React from 'react';
import {StyleSheet, Text, View, Modal} from 'react-native';
import TextInput from 'components/textInput/TextInput';
import Avatar, {AVATAR_STATUS} from 'components/Avatar';
import Button from 'components/Button';
import useModalAddMovement from './useModalAddMovement';
import {colors} from 'utils/colors';

export const MODAL_MOVEMENT_MODES = {
  ADD: 'ADD',
  EDIT: 'EDIT',
};

const ModalAddMovement = ({
  user,
  isVisible,
  mode = MODAL_MOVEMENT_MODES.ADD,
  modeConfig = {
    movementId: null,
  },
  onAddMovement,
  onEditMovement,
  onRequestClose,
}) => {
  const {
    inputRef,
    amount,
    isDisabledSaveBtn,
    handleShowModal,
    handleChangeAmount,
    handleSubmitEditing,
  } = useModalAddMovement({mode, modeConfig, onAddMovement, onEditMovement});

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onShow={handleShowModal}
      onRequestClose={onRequestClose}>
      <View style={styles.mainView}>
        <View style={styles.topPortion}>
          <Avatar status={AVATAR_STATUS.inFavor} image={user.imagePath} />
          <View style={styles.inputView}>
            <Text style={styles.textInputPrefix}>$</Text>
            <TextInput
              blurOnSubmit={false}
              keyboardType="numeric"
              ref={inputRef}
              value={amount}
              format="0,0"
              onChangeText={handleChangeAmount}
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
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingBottom: 48,
    flex: 1,
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
    marginTop: 32,
    position: 'relative',
    width: '75%',
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
  },
  textInputPrefix: {
    position: 'absolute',
    bottom: 0,
    fontSize: 56,
    lineHeight: 68,
    color: colors.white,
  },
});

export default ModalAddMovement;
