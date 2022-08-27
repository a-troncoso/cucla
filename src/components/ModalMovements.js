import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import MovementItem from 'components/MovementItem';
import {colors} from 'utils/colors';

const ModalMovements = ({
  isVisible,
  movements,
  onRequestClose,
  onRemoveMovement,
}) => {
  const renderItem = ({item}) => {
    return (
      <MovementItem
        amount={item.amount}
        idMovement={item.id}
        debtUserImagePath={item.debtUserImagePath}
        payingUserImage={item.payingUserImagePath}
        onRemoveMovement={onRemoveMovement}
      />
    );
  };

  return (
    <View>
      <Modal
        visible={isVisible}
        animationType="slide"
        style={styles.mainView}
        onRequestClose={onRequestClose}>
        <SafeAreaView style={styles.listContainer}>
          <FlatList
            data={movements}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {backgroundColor: 'red'},
  listContainer: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  separator: {
    borderColor: colors.disabled,
    borderWidth: 1,
    backgroundColor: colors.disabled,
  },
  amount: {
    flex: 1,
    color: colors.white,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default ModalMovements;
