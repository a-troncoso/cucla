import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Avatar} from '../../components';

const ModalUser = ({user, isVisible, onSubmitAmount, onRequestClose}) => {
  const inputRef = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';

  const handleShowModal = () => {
    // TODO: fix this
    inputRef.current.focus();
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      style={[styles.mainView, isDarkMode ? styles.dark : styles.light]}
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
  light: {backgroundColor: Colors.lighter},
  dark: {backgroundColor: Colors.darker},
  mainView: {
    backgroundColor: Colors.darker,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {marginTop: 40, marginBottom: 20},
  inputView: {
    position: 'relative',
    width: '75%',
    borderBottomWidth: 2,
    borderBottomColor: Colors.lighter,
  },
  textInputPrefix: {
    position: 'absolute',
    bottom: 0,
    fontSize: 48,
    lineHeight: 68,
  },
  textInputAmount: {
    left: 32,
    fontSize: 32,
  },
});

export default ModalUser;
