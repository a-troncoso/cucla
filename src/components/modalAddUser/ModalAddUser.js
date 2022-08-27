import React, {useRef, useState} from 'react';
import {StyleSheet, View, Modal, TextInput, FlatList} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Avatar from 'components/Avatar';
import Button from 'components/Button';
import useModalAddUser from './useModalAddUser';
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

const ModalAddUser = ({isVisible, onAddUser, onRequestClose}) => {
  const {
    userName,
    newImage,
    inputRef,
    isDisabledSaveBtn,
    handleShowModal,
    handleAddUser,
    handleChangeUserName,
    renderImageSourceOption,
    handleRequestCloseModalImageSourceOptions,
    isVisibleModalImageSourceOptions,
  } = useModalAddUser({onAddUser});

  return (
    <View>
      <Modal
        visible={isVisible}
        animationType="slide"
        onShow={handleShowModal}
        onRequestClose={onRequestClose}>
        <View style={styles.mainView}>
          <View style={styles.topPortion}>
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
                value={userName}
                onChangeText={handleChangeUserName}
                onSubmitEditing={handleAddUser}
              />
            </View>
          </View>
          <View style={styles.bottomPortion}>
            <Button onPress={handleAddUser} disabled={isDisabledSaveBtn}>
              Guardar
            </Button>
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
