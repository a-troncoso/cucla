/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {StatusBar, StyleSheet, useColorScheme, View, Image} from 'react-native';
import {Avatar, Counter} from '../components';
import ModalUser from './ModalUser';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useMovements} from '../../generic/hooks/useMovements';
import {useAccount} from '../../generic/hooks/useAccount';

const AVATAR_STATUS = {
  IN_FAVOR: 'IN_FAVOR',
  AGAINST: 'AGAINST',
};

const Home = ({accountId = null}) => {
  const [modalUserConfig, setModalUserConfig] = useState({
    isVisible: false,
    user: {id: null, image: null, status: null},
  });

  const {account, findAccountById} = useAccount({accountId});
  const {registerMovement} = useMovements({accountId}, () => findAccountById());

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
    });
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
        <Counter value={account.debt} style={styles.counter} />
        <Avatar
          userName={account.users[1]?.name}
          status={AVATAR_STATUS.AGAINST}
          image={account.users[1]?.imagePath}
          onPressImage={() => handlePressImage(account.users[1])}
        />
      </View>

      <ModalUser
        user={modalUserConfig.user}
        isVisible={modalUserConfig.isVisible}
        onSubmitAmount={handleSubmitAmount}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  light: {backgroundColor: Colors.lighter},
  dark: {backgroundColor: Colors.darker},
  mainView: {
    flex: 1,
    justifyContent: 'center',
  },
  accountCounter: {
    marginTop: 150,
  },
  counter: {
    marginVertical: 16,
  },
});

export default Home;
