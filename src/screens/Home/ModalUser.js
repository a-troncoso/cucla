import React, {useRef} from 'react';
import {StyleSheet, Text, View, Modal, TextInput} from 'react-native';
import {colors} from 'utils/colors';
import {Avatar} from '../../components';

const ModalUser = ({user, isVisible, onSubmitAmount, onRequestClose}) => {
  const inputRef = useRef(null);

  const handleShowModal = () => {
    // TODO: fix this
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
        <Avatar
          status={user.status}
          image={user.imagePath}
          style={styles.avatar}
        />

        <View style={styles.inputView}>
          <Text style={styles.textInputPrefix}>$</Text>
          <TextInput
            style={styles.textInputAmount}
            keyboardType="numeric"
            onSubmitEditing={onSubmitAmount}
            ref={inputRef}
            blurOnSubmit={false}
            autoFocus
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
  avatar: {marginTop: 40, marginBottom: 20},
  inputView: {
    marginTop: 32,
    position: 'relative',
    width: '75%',
    borderBottomWidth: 2,
    borderBottomColor: colors.black,
  },
  textInputPrefix: {
    position: 'absolute',
    bottom: 0,
    fontSize: 56,
    lineHeight: 68,
    color: colors.white,
  },
  textInputAmount: {
    paddingLeft: 32,
    fontSize: 40,
    color: colors.white,
    textAlign: 'center',
  },
});

export default ModalUser;
