import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import Avatar, {sizes, AVATAR_STATUS} from './Avatar';
import ModalMovementOptions from 'components/modalMovementOptions/ModalMovementOptions';
import {colors} from 'utils/colors';
import {toCurrencyFormat} from 'utils/number';

const MovementItem = ({
  idMovement,
  payingUserImage,
  debtUserImagePath,
  amount,
  onRemoveMovement,
}) => {
  const [isVisibleModalMovementOptions, setIsVisibleModalMovementOptions] =
    useState(false);

  const handleLongPressMovementItem = () => {
    Vibration.vibrate(48);
    setIsVisibleModalMovementOptions(true);
  };

  const handleRequestCloseModalMovementOptions = () => {
    setIsVisibleModalMovementOptions(false);
  };

  const handlePressOptionModalMovement = ({optionId, idMovement}) => {
    const optionsById = {
      1: () => {},
      2: () => onRemoveMovement(idMovement),
    };
    optionsById[optionId]();
  };

  return (
    <>
      <TouchableOpacity
        style={styles.gestureRecognizer}
        onLongPress={handleLongPressMovementItem}>
        <View style={styles.movementContainer}>
          <Avatar
            status={AVATAR_STATUS.inFavor}
            image={payingUserImage}
            size={sizes.SMALL}
          />
          <Text style={styles.amount}>{toCurrencyFormat(amount)}</Text>
          <Avatar
            status={AVATAR_STATUS.debt}
            image={debtUserImagePath}
            size={sizes.SMALL}
          />
        </View>
      </TouchableOpacity>
      <ModalMovementOptions
        idMovement={idMovement}
        isVisible={isVisibleModalMovementOptions}
        onRequestClose={handleRequestCloseModalMovementOptions}
        onPressOption={handlePressOptionModalMovement}
      />
    </>
  );
};

const styles = StyleSheet.create({
  gestureRecognizer: {
    flex: 1,
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

export default MovementItem;
