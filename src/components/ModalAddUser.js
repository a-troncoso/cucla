import React, {useRef, useState} from 'react';
import {StyleSheet, View, Modal, TextInput, FlatList} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import {colors} from 'utils/colors';

const IMAGE_SOURCE_OPTIONS = [
  {
    id: 1,
    title: 'Cámara',
  },
  {
    id: 2,
    title: 'Galería',
  },
];

const ModalAddUser = ({isVisible, onSubmit, onRequestClose}) => {
  const inputRef = useRef(null);
  const [newImage, setNewImage] = useState();
  const [
    isVisibleModalImageSourceOptions,
    setIsVisibleModalImageSourceOptions,
  ] = useState(false);

  const handleShowModal = () => {
    inputRef.current.focus();
  };

  const handleSubmit = text => {
    if (!text) return;

    onSubmit({
      name: text,
      imagePath: newImage,
    });
  };

  const handlePressImageSourceOption = ({id}) => {
    const options = {
      storageOptions: {
        includeBase64: false,
      },
    };
    const launcherFunctionByOptionId = {
      1: launchCamera,
      2: launchImageLibrary,
    };

    launcherFunctionByOptionId[id](options, response => {
      setIsVisibleModalImageSourceOptions(false);
      if (response.didCancel) return;
      setNewImage(response.assets[0].uri);
      inputRef.current.focus();
    });
  };

  const renderImageSourceOption = ({item}) => (
    <Button onPress={() => handlePressImageSourceOption({id: item.id})}>
      {item.title}
    </Button>
  );

  const handleRequestCloseModalImageSourceOptions = () => {
    setIsVisibleModalImageSourceOptions(false);
  };

  return (
    <View>
      <Modal
        visible={isVisible}
        animationType="slide"
        onShow={handleShowModal}
        onRequestClose={onRequestClose}>
        <View style={styles.mainView}>
          <Avatar
            image={newImage}
            onPressImage={() => setIsVisibleModalImageSourceOptions(true)}
          />
          <View style={styles.inputView}>
            <TextInput
              style={styles.textInputAmount}
              ref={inputRef}
              blurOnSubmit={false}
              placeholder="Nombre del usuario"
              placeholderTextColor={colors.disabled}
              textAlign="center"
              onSubmitEditing={({nativeEvent}) =>
                handleSubmit(nativeEvent.text)
              }
            />
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={isVisibleModalImageSourceOptions}
        transparent
        statusBarTranslucent
        onRequestClose={handleRequestCloseModalImageSourceOptions}>
        <View style={stylesModalImageSourceOptions.topPortion} />
        <View style={stylesModalImageSourceOptions.centerPortion}>
          <FlatList
            contentContainerStyle={
              stylesModalImageSourceOptions.sourceOptionsContainer
            }
            data={IMAGE_SOURCE_OPTIONS}
            renderItem={renderImageSourceOption}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
              <View
                style={stylesModalImageSourceOptions.sourceOptionsSeparator}
              />
            )}
          />
        </View>
        <View style={stylesModalImageSourceOptions.bottomPortion} />
      </Modal>
    </View>
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
    fontSize: 32,
    color: colors.white,
  },
});

const stylesModalImageSourceOptions = StyleSheet.create({
  topPortion: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: colors.modalBackdrop,
  },
  centerPortion: {
    flex: 1,
    backgroundColor: colors.modalBackdrop,
  },
  sourceOptionsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  sourceOptionsSeparator: {
    height: 24,
  },
  bottomPortion: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.modalBackdrop,
  },
});

export default ModalAddUser;
