import React from 'react';
import {StyleSheet, View, Modal, FlatList} from 'react-native';
import Button from 'components/Button';
import useModalImageSourceOptions from './useModalImageSourceOptions';
import {colors} from 'utils/colors';

const IMAGE_SOURCE_OPTIONS = [
  {
    id: 0,
    title: 'Cámara',
  },
  {
    id: 1,
    title: 'Galería',
  },
];

const ModalImageSourceOptions = ({
  isVisible = false,
  onRequestClose = () => {},
  onSelectNewImage = () => {},
}) => {
  const {handlePressImageSourceOption} = useModalImageSourceOptions({
    onSelectNewImage,
  });

  const renderImageSourceOption = ({item}) => (
    <Button onPress={() => handlePressImageSourceOption({id: item.id})}>
      {item.title}
    </Button>
  );

  return (
    <Modal
      animationType="slide"
      visible={isVisible}
      transparent
      statusBarTranslucent
      onRequestClose={onRequestClose}>
      <View style={styles.mainView}>
        <View style={styles.topPortion} />
        <View style={styles.centerPortion}>
          <FlatList
            contentContainerStyle={styles.sourceOptionsContainer}
            data={IMAGE_SOURCE_OPTIONS}
            renderItem={renderImageSourceOption}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => (
              <View style={styles.sourceOptionsSeparator} />
            )}
          />
        </View>
        <View style={styles.bottomPortion} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
  },
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
    alignItems: 'center',
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

export default ModalImageSourceOptions;
