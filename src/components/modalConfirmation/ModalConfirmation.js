import React from 'react';
import {StyleSheet, View, Modal, FlatList, Text} from 'react-native';
import Button from 'components/Button';
import {colors} from 'utils/colors';

const ModalConfirmation = ({
  isVisible = false,
  title = '',
  onPositiveSelection = () => {},
  onNegativeSelection = () => {},
  onRequestClose = () => {},
}) => {
  const OPTIONS = [
    {
      id: 0,
      title: 'Si',
      event: onPositiveSelection,
    },
    {
      id: 1,
      title: 'No',
      event: onNegativeSelection,
    },
  ];

  const renderOption = ({item}) => {
    return <Button onPress={item.event}>{item.title}</Button>;
  };

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
          {title && <Text style={styles.title}>{title}</Text>}
          <FlatList
            contentContainerStyle={styles.sourceOptionsContainer}
            data={OPTIONS}
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
  title: {
    color: colors.white,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: '500',
    paddingHorizontal: 24,
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

export default ModalConfirmation;
