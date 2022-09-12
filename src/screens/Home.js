import React, {useState} from 'react';
import {StatusBar, StyleSheet, View, Alert, Text} from 'react-native';
import Counter from 'components/Counter';
import Avatar, {AVATAR_STATUS} from 'components/Avatar';
import ModalAddMovement from 'components/modalAddMovement/ModalAddMovement';
import ModalMovements from 'components/ModalMovements';
import ModalUserOptions from 'components/modalUserOptions/ModalUserOptions';
import ModalUser, {MODAL_USER_MODES} from 'components/modalUser/ModalUser';
import {colors} from 'utils/colors';
import {useMovements} from 'hooks/useMovements';
import useAccount from 'hooks/useAccount';
import useHome from './useHome';

const EmptyUsers = () => (
  <View>
    <Text style={styles.emptyAccountText}>Aún no has agregado usuarios</Text>
    <Text style={styles.emptyAccountText}>
      Presiona en el ícono agregar usuario
    </Text>
  </View>
);

const Home = ({accountId = null, onUpdateUser = () => {}}) => {
  const {
    userIdToEdit,
    userAttributeToEdit,
    isVisibleModalUserOptions,
    isVisibleModalUser,
    handleLongPressImage,
    handleRequestCloseModalUserOptions,
    handlePressOptionModalUserOptions,
    handleRequestCloseModalUser,
    handleEditUser,
  } = useHome({onUpdateUser});

  const [modalUserConfig, setModalUserConfig] = useState({
    isVisible: false,
    user: {id: null, image: null, status: null},
  });
  const [isVisibleModalMovements, setIsVisibleModalMovements] = useState(false);
  const {account, findAccountById} = useAccount({accountId});
  const {registerMovement, movements, fetchMovements, removeMovement} =
    useMovements(
      {accountId},
      () => {
        findAccountById();
        fetchMovements();
      },
      () => {
        findAccountById();
        fetchMovements();
      },
    );

  const handlePressImage = user => {
    setModalUserConfig(prevState => ({
      ...prevState,
      isVisible: true,
      user: {...prevState.user, ...user},
    }));
  };

  const handleAddMovement = amount => {
    setModalUserConfig(prevState => ({
      ...prevState,
      isVisible: false,
    }));

    registerMovement({
      amount,
      payingUserId: modalUserConfig.user.id,
      debtUserId: account.users.find(u => u.id !== modalUserConfig.user.id).id,
    });
  };

  const handlePressCounter = () => {
    if (movements.length === 0)
      Alert.alert('Sin movimientos', `No tenemos movimientos en esta cuenta`, [
        {
          text: 'Ok',
        },
      ]);
    else setIsVisibleModalMovements(true);
  };

  const handleRequestCloseModal = () => {
    setModalUserConfig(prevState => ({
      ...prevState,
      isVisible: false,
    }));
  };

  const handleRemoveMovement = id => {
    removeMovement({id});
  };

  const handleRequestCloseModalMovements = () => {
    setIsVisibleModalMovements(false);
  };

  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor={colors.primary} />

      <View style={styles.accountCounter}>
        {account.users.length === 2 ? (
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
        ) : (
          <EmptyUsers />
        )}
      </View>

      <ModalAddMovement
        user={modalUserConfig.user}
        isVisible={modalUserConfig.isVisible}
        onAddMovement={handleAddMovement}
        onRequestClose={handleRequestCloseModal}
      />

      <ModalMovements
        movements={movements}
        isVisible={isVisibleModalMovements}
        onRequestClose={handleRequestCloseModalMovements}
        onRemoveMovement={handleRemoveMovement}
      />

      <ModalUserOptions
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
  emptyAccountText: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
  },
});

export default Home;
