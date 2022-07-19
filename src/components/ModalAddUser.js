import React, {useRef, useState} from 'react';
import {StyleSheet, View, Modal, TextInput} from 'react-native';
import {colors} from 'utils/colors';
import Avatar from 'components/Avatar';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ModalAddUser = ({isVisible, onSubmit, onRequestClose}) => {
  const inputRef = useRef(null);
  const [newImage, setNewImage] = useState();

  const handleShowModal = () => {
    // TODO: fix this
    inputRef.current.focus();
  };

  const handleSubmit = text => {
    if (!text) return;

    onSubmit({
      name: text,
      imagePath: newImage,
    });
  };

  const handleLaunchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      // const image = response.assets.length > 0 ? response.assets[0].uri : null;
      // console.log('response', JSON.stringify(response));
      setNewImage();
    });
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      onShow={handleShowModal}
      onRequestClose={onRequestClose}>
      <View style={styles.mainView}>
        <Avatar image={newImage} onPressImage={handleLaunchImageLibrary} />
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
