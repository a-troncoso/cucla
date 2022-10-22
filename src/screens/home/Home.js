import React, {useState} from 'react';
import {StatusBar, StyleSheet, View, Alert} from 'react-native';
import Counter from 'components/Counter';
import Avatar, {AVATAR_STATUS} from 'components/Avatar';
import ModalAddMovement from 'components/modalAddMovement/ModalAddMovement';
import ModalMovements from 'components/ModalMovements';
import ModalUserOptions from 'components/modalUserOptions/ModalUserOptions';
import ModalUser, {MODAL_USER_MODES} from 'components/modalUser/ModalUser';
import ModalConfirmation from 'components/modalConfirmation/ModalConfirmation';
import {colors} from 'utils/colors';
import useHome from './useHome';

const Home = ({
  accountId = null,
  onUpdateUser = () => {},
  onRemoveAccount = () => {},
}) => {
  const {
    account,
    userIdToEdit,
    userAttributeToEdit,
    movementIdToEdit,
    isVisibleModalUserOptions,
    isVisibleModalUser,
    isVisibleModalConfirmation,
    modeModalMovement,
    modalMovement,
    movements,
    handleLongPressImage,
    handleRequestCloseModalUserOptions,
    handlePressOptionModalUserOptions,
    handleRequestCloseModalUser,
    handleRemoveAccount,
    handlePressNegativeSelection,
    handleRequestCloseModalConfirmation,
    handleEditUser,
    handleChangeMovementAmount,
    handleRequestCloseModalMovement,
    handleAddMovement,
    handleEditMovement,
    handlePressImage,
    handleRemoveMovement,
  } = useHome({accountId, onUpdateUser, onRemoveAccount});

  const [isVisibleModalMovements, setIsVisibleModalMovements] = useState(false);

  const handlePressCounter = () => {
    if (movements.length === 0)
      Alert.alert('Sin movimientos', `No tenemos movimientos en esta cuenta`, [
        {
          text: 'Ok',
        },
      ]);
    else setIsVisibleModalMovements(true);
  };

  const handleRequestCloseModalMovements = () => {
    setIsVisibleModalMovements(false);
  };

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor={colors.primary} />

      <View style={styles.accountCounter}>
        <View>
          <Avatar
            status={AVATAR_STATUS.inFavor}
            image={account.users[0]?.imagePath}
            onPress={() => handlePressImage(account.users[0])}
            onLongPress={() => handleLongPressImage(account.users[0])}
          />
          <Counter
            style={styles.counter}
            value={account.debt}
            onPress={handlePressCounter}
          />
          <Avatar
            status={
              account.debt === 0 ? AVATAR_STATUS.inFavor : AVATAR_STATUS.debt
            }
            image={account.users[1]?.imagePath}
            onPress={() => handlePressImage(account.users[1])}
            onLongPress={() => handleLongPressImage(account.users[1])}
          />
        </View>
      </View>

      <ModalAddMovement
        isVisible={modalMovement.isVisible}
        mode={modeModalMovement}
        modeConfig={{
          movementId: movementIdToEdit,
        }}
        user={modalMovement.user}
        onAddMovement={handleAddMovement}
        onEditMovement={handleEditMovement}
        onRequestClose={handleRequestCloseModalMovement}
      />

      <ModalMovements
        isVisible={isVisibleModalMovements}
        movements={movements}
        onRequestClose={handleRequestCloseModalMovements}
        onRemoveMovement={handleRemoveMovement}
        onChangeMovementAmount={handleChangeMovementAmount}
      />

      <ModalUserOptions
        idUser={userIdToEdit}
        isVisible={isVisibleModalUserOptions}
        onRequestClose={handleRequestCloseModalUserOptions}
        onPressOption={handlePressOptionModalUserOptions}
      />

      <ModalUser
        isVisible={isVisibleModalUser}
        mode={MODAL_USER_MODES.EDIT}
        modeConfig={{
          userId: userIdToEdit,
          attributeToEdit: userAttributeToEdit,
        }}
        onEditUser={handleEditUser}
        onRequestClose={handleRequestCloseModalUser}
      />

      <ModalConfirmation
        isVisible={isVisibleModalConfirmation}
        title="¿Quieres eliminar la cuenta usuario?"
        onPositiveSelection={() => handleRemoveAccount({accountId})}
        onNegativeSelection={handlePressNegativeSelection}
        onRequestClose={handleRequestCloseModalConfirmation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  accountCounter: {
    justifyContent: 'center',
  },
  counter: {
    marginVertical: 16,
  },
});

export default Home;
