import React, {useState} from 'react';
import {StatusBar, StyleSheet, useColorScheme, View} from 'react-native';
import {Avatar, Counter} from '../../components';
import ModalUser from './ModalUser';
import ModalMovements from './ModalMovements';
import {Colors} from 'react-native/Libraries/NewAppScreen';
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

  const isDarkMode = useColorScheme() === 'dark';

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
    <View style={[styles.mainView, isDarkMode ? styles.dark : styles.light]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.accountCounter}>
        <Avatar
          userName={account.users[0]?.name}
          status={AVATAR_STATUS.IN_FAVOR}
          image={account.users[0]?.imagePath}
          onPressImage={() => handlePressImage(account.users[0])}
        />
        <Counter
          value={account.debt}
          style={styles.counter}
          onPress={handlePressCounter}
        />
        <Avatar
          userName={account.users[1]?.name}
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
    </View>
  );
};

const styles = StyleSheet.create({
  light: {backgroundColor: Colors.lighter},
  dark: {backgroundColor: Colors.darker},
  mainView: {
    // borderWidth: 1,
    // borderColor: Colors.white,
    flex: 1,
  },
  accountCounter: {
    marginTop: 100,
  },
  counter: {
    marginVertical: 16,
  },
});

export default Home;
