/**
 * Sample React Native Home
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {Avatar, Counter} from '../components';
import ModalUser from './ModalUser';

import api from '../../services/api';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Home = () => {
  const AVATAR_STATUS = {
    IN_FAVOR: 'IN_FAVOR',
    AGAINST: 'AGAINST',
  };
  const [modalUserConfig, setModalUserConfig] = useState({
    isVisible: false,
    user: {id: null, image: null, status: null},
  });

  const isDarkMode = useColorScheme() === 'dark';

  const users = [
    {
      id: 1,
      image: {
        uri: 'https://www.sespm.es/wp-content/uploads/2017/11/avatar-1577909_960_720.png',
      },
      status: AVATAR_STATUS.IN_FAVOR,
    },
    {
      id: 2,
      image: {
        uri: 'https://www.sespm.es/wp-content/uploads/2017/11/avatar-1577909_960_720.png',
      },
      status: AVATAR_STATUS.AGAINST,
    },
  ];

  const handlePressImage = user => {
    console.log({user});
    setModalUserConfig(prevState => ({
      ...prevState,
      isVisible: true,
      user: {...prevState.user, ...user},
    }));
  };

  const handleSubmitAmount = ({nativeEvent}) => {
    console.log(nativeEvent.text);
    setModalUserConfig(prevState => ({
      ...prevState,
      isVisible: false,
    }));

    registerTransaction(nativeEvent.text);
  };

  const registerTransaction = async amount => {
    try {
      const result = await api.registerTransaction({
        amount,
        userId: modalUserConfig.user.id,
      });

      console.log(result);
    } catch (e) {
      alert('Error al registrar', JSON.stringify(e));
    }
  };

  return (
    <View style={[styles.mainView, isDarkMode ? styles.dark : styles.light]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.accountCounter}>
        <Avatar
          status={AVATAR_STATUS.IN_FAVOR}
          image={users[0].image}
          onPressImage={() => handlePressImage(users[0])}
        />
        <Counter value={180000} style={styles.counter} />
        <Avatar
          status={AVATAR_STATUS.AGAINST}
          image={users[1].image}
          onPressImage={() => handlePressImage(users[1])}
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
    // borderBottomColor: 'black',
    // borderWidth: 1,
    // borderStyle: 'solid',

    marginTop: 150,
  },
  counter: {
    marginVertical: 16,
  },
});

export default Home;
