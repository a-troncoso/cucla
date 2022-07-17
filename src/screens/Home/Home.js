import React, {useState} from 'react';
import {StatusBar, StyleSheet, View, ScrollView, Alert} from 'react-native';
import {Avatar, Counter} from '../../components';
import ModalUser from './ModalUser';
import ModalMovements from './ModalMovements';
import {colors} from 'utils/colors';
import {useMovements} from 'hooks/useMovements';
import {useAccount} from 'hooks/useAccount';

const AVATAR_STATUS = {
  IN_FAVOR: 'IN_FAVOR',
  DEBT: 'DEBT',
};

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
      Alert.alert('Movimientos', `No tenemos movimientos para este usuario`, [
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
    <ScrollView
      style={styles.mainView}
      contentContainerStyle={styles.scrollViewContainer}>
      <StatusBar backgroundColor={colors.primary} />

      <View style={styles.accountCounter}>
        <Avatar
          status={AVATAR_STATUS.IN_FAVOR}
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
            account.debt === 0 ? AVATAR_STATUS.IN_FAVOR : AVATAR_STATUS.DEBT
          }
          image={account.users[1]?.imagePath}
          onPressImage={() => handlePressImage(account.users[1])}
        />
      </View>

      <ModalUser
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.primary,
  },
  scrollViewContainer: {flex: 1, justifyContent: 'center'},
  accountCounter: {},
  counter: {
    marginVertical: 16,
  },
});

export default Home;
