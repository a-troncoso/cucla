import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {colors} from 'utils/colors';
import GestureRecognizer from 'react-native-swipe-gestures';
import Avatar, {sizes, AVATAR_STATUS} from '../../components/Avatar';
import {toCurrencyFormat} from 'utils/number';

const gestureRecognizerConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const ModalMovements = ({
  isVisible,
  movements,
  onRequestClose,
  onRemoveMovement,
}) => {
  const handleSwipeRightMovement = (movementId, payingUserName) => {
    Alert.alert(
      'Eliminar movimiento',
      `¿Estás seguro de eliminar el movimiento de ${payingUserName}?`,
      [
        {
          text: 'No',
        },
        {text: 'Si', onPress: () => onRemoveMovement(movementId)},
      ],
    );
  };

  const renderItem = ({item}) => {
    return (
      <Movement
        id={item.id}
        payingUserImage={item.payingUserImagePath}
        debtUserImagePath={item.debtUserImagePath}
        amount={item.amount}
        onSwipeRight={() =>
          handleSwipeRightMovement(item.id, item.payingUserName)
        }
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
        <FlatList
          data={movements}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </Modal>
  );
};

const Movement = ({
  payingUserImage,
  debtUserImagePath,
  amount,
  onSwipeRight,
}) => {
  return (
    <GestureRecognizer
      style={styles.gestureRecognizer}
      config={gestureRecognizerConfig}
      onSwipeRight={onSwipeRight}>
      <View style={styles.movementContainer}>
        <Avatar
          status={AVATAR_STATUS.inFavor}
          image={payingUserImage}
          containerStyle={styles.avatarContainer}
          size={sizes.SMALL}
        />
        <Text style={styles.amount}>{toCurrencyFormat(amount)}</Text>
        <Avatar
          status={AVATAR_STATUS.debt}
          containerStyle={styles.avatarContainer}
          image={debtUserImagePath}
          size={sizes.SMALL}
        />
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  mainView: {backgroundColor: 'red'},
  listContainer: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  gestureRecognizer: {
    flex: 1,
  },
  separator: {
    borderColor: colors.disabled,
    borderWidth: 1,
    backgroundColor: colors.disabled,
  },
  movementContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  amount: {
    flex: 1,
    color: colors.white,
    fontSize: 24,
    textAlign: 'center',
  },
});

export default ModalMovements;
