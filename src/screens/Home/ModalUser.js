import React, {useRef} from 'react';
import {StyleSheet, Text, View, Modal, TextInput} from 'react-native';
import {colors} from 'utils/colors';
import Avatar, {AVATAR_STATUS} from '../../components/Avatar';

const ModalUser = ({user, isVisible, onSubmitAmount, onRequestClose}) => {
  const inputRef = useRef(null);

  const handleShowModal = () => {
    inputRef.current.focus();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      style={styles.mainView}
      onShow={handleShowModal}
      onRequestClose={onRequestClose}>
      <View style={styles.mainView}>
        <Avatar status={AVATAR_STATUS.inFavor} image={user.imagePath} />

        <View style={styles.inputView}>
          <Text style={styles.textInputPrefix}>$</Text>
          <TextInput
            style={styles.textInputAmount}
            keyboardType="numeric"
            onSubmitEditing={onSubmitAmount}
            ref={inputRef}
            blurOnSubmit={false}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
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

export default ModalUser;
