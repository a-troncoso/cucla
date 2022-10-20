import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Modal,
  SafeAreaView,
  FlatList,
  Text,
} from 'react-native';
import MovementItem from 'components/MovementItem';
import {colors} from 'utils/colors';

const EmptyMovements = () => (
  <View style={styles.emptyMovementsMainView}>
    <Text style={styles.emptyMovementsText}>
      No tenemos movimientos en esta cuenta
    </Text>
  </View>
);

const ModalMovements = ({
  isVisible,
  movements,
  onRequestClose,
  onRemoveMovement,
  onChangeMovementAmount,
}) => {
  const renderItem = ({item}) => {
    return (
      <MovementItem
        amount={item.amount}
        idMovement={item.id}
        debtUserImagePath={item.debtUserImagePath}
        payingUserImage={item.payingUserImagePath}
        onRemoveMovement={onRemoveMovement}
        onChangeMovementAmount={onChangeMovementAmount}
      />
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      style={styles.mainView}
      onRequestClose={onRequestClose}>
      <SafeAreaView style={styles.listContainer}>
        {movements.length > 0 ? (
          <FlatList
            data={movements}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        ) : (
          <EmptyMovements />
        )}
      </SafeAreaView>
    </Modal>
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
  emptyMovementsMainView: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyMovementsText: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
  },
});

export default ModalMovements;
