import React from 'react';
import {StyleSheet, Text, View, Modal, TextInput} from 'react-native';
import Avatar, {AVATAR_STATUS} from '../../../components/Avatar';
import Button from 'components/Button';
import useModalAddMovement from './useModalAddMovement';
import {colors} from 'utils/colors';

const ModalAddMovement = ({user, isVisible, onAddMovement, onRequestClose}) => {
  const {
    inputRef,
    amount,
    isDisabledSaveBtn,
    handleShowModal,
    handleChangeAmount,
    handleAddMovement,
  } = useModalAddMovement({onAddMovement});

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
              style={styles.textInputAmount}
              value={amount}
              onChangeText={handleChangeAmount}
              onSubmitEditing={handleAddMovement}
            />
          </View>
        </View>
        <View style={styles.bottomPortion}>
          <Button onPress={handleAddMovement} disabled={isDisabledSaveBtn}>
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
  textInputAmount: {
    paddingLeft: 40,
    fontSize: 40,
    color: colors.white,
    textAlign: 'center',
  },
});

export default ModalAddMovement;
