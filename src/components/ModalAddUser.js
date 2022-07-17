import React, {useRef} from 'react';
import {StyleSheet, View, Modal, TextInput, useColorScheme} from 'react-native';
import {colors} from 'utils/colors';
import Avatar from 'components/Avatar';

const ModalAddUser = ({isVisible, onSubmit, onRequestClose}) => {
  const inputRef = useRef(null);

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
      style={styles.mainView}
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
            placeholder="Nombre del usuario"
            placeholderTextColor={colors.disabled}
            autoFocus
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  avatar: {marginTop: 40, marginBottom: 20},
  inputView: {
    width: 300,
    marginTop: 32,
    borderBottomWidth: 2,
    borderBottomColor: colors.white,
  },
  textInputAmount: {
    textAlign: 'center',
    fontSize: 32,
    color: colors.white,
  },
});

export default ModalAddUser;
