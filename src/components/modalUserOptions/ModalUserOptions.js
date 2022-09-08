import React from 'react';
import {StyleSheet, View, Modal, FlatList} from 'react-native';
import useModalUserOptions from './useModalUserOptions';
import {colors} from 'utils/colors';

const USER_OPTIONS = [
  {
    id: 1,
    title: 'Cambiar foto',
    disabled: true,
  },
  {
    id: 2,
    title: 'Cambiar nombre',
  },
];

const ModalUserOptions = ({
  isUser,
  isVisible = false,
  onRequestClose = () => {},
  onPressOption = () => {},
}) => {
  const {renderOption} = useModalUserOptions({isUser, onPressOption});

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
            data={USER_OPTIONS}
            renderItem={renderOption}
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

export default ModalUserOptions;
