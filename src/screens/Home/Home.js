import React, {useState} from 'react';
import {StatusBar, StyleSheet, View, Alert, Text} from 'react-native';
import {Counter} from '../../components';
import Avatar, {AVATAR_STATUS} from '../../components/Avatar';
import ModalAddMovement from './ModalAddMovement';
import ModalMovements from './ModalMovements';
import {colors} from 'utils/colors';
import {useMovements} from 'hooks/useMovements';
import {useAccount} from 'hooks/useAccount';

const Home = ({accountId = null}) => {
  const [modalUserConfig, setModalUserConfig] = useState({
    isVisible: false,
    user: {id: null, image: null, status: null},
  });
  const [modalMovements, setModalMovements] = useState({
    isVisible: false,
  });
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

  const handleSubmitAmount = ({nativeEvent}) => {
    setModalUserConfig(prevState => ({
      ...prevState,
      isVisible: false,
    }));

    registerMovement({
      amount: nativeEvent.text,
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
    else
      setModalMovements(prevState => ({
        ...prevState,
        isVisible: true,
      }));
  };

  const handleRequestCloseModal = () => {
    setModalUserConfig(prevState => ({
      ...prevState,
      isVisible: false,
    }));
    setModalMovements(prevState => ({
      ...prevState,
      isVisible: false,
    }));
  };

  const handleRemoveMovement = id => {
    removeMovement({id});
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
              onPressImage={() => handlePressImage(account.users[0])}
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
              onPressImage={() => handlePressImage(account.users[1])}
            />
          </View>
        ) : (
          <View style={styles.emptyAccount}>
            <Text style={styles.emptyAccountText}>
              Aún no has agregado usuarios
            </Text>
            <Text style={styles.emptyAccountText}>
              Presiona en el ícono agregar usuario
            </Text>
          </View>
        )}
      </View>

      <ModalAddMovement
        user={modalUserConfig.user}
        isVisible={modalUserConfig.isVisible}
        onSubmitAmount={handleSubmitAmount}
        onRequestClose={handleRequestCloseModal}
      />

      <ModalMovements
        movements={movements}
        isVisible={modalMovements.isVisible}
        onSubmit={handleSubmitAmount}
        onRequestClose={handleRequestCloseModal}
        onRemoveMovement={handleRemoveMovement}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    // borderWidth: 1,
    // borderColor: 'yellow',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  accountCounter: {
    // borderWidth: 1,
    // borderColor: 'green',
    justifyContent: 'center',
  },
  counter: {
    marginVertical: 16,
  },
  emptyAccount: {},
  emptyAccountText: {
    fontSize: 20,
    color: colors.white,
    textAlign: 'center',
  },
});

export default Home;
