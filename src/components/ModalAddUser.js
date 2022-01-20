import React, {useRef} from 'react';
import {StyleSheet, View, Modal, TextInput, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Avatar from 'components/Avatar';

const ModalAddUser = ({isVisible, onSubmit, onRequestClose}) => {
  const inputRef = useRef(null);
  const isDarkMode = useColorScheme() === 'dark';

  const handleShowModal = () => {
    // TODO: fix this
    inputRef.current.focus();
  };

  const handleSubmit = text => {
    if (!text) return;

    onSubmit({
      name: text,
      imagePath:
        'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
    });
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      style={[styles.mainView, isDarkMode ? styles.dark : styles.light]}
      onShow={handleShowModal}
      onRequestClose={onRequestClose}>
      <View style={styles.mainView}>
        <Avatar style={styles.avatar} />
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInputAmount}
            onSubmitEditing={({nativeEvent}) => handleSubmit(nativeEvent.text)}
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
    textAlign: 'center',
    fontSize: 32,
  },
});

export default ModalAddUser;
