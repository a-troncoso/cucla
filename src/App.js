/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import Home from './screens/Home/Home';
import {useUsers} from './generic/hooks/useUsers';

const App = () => {
  const {users} = useUsers();

  return <Home users={users} />;
};

export default App;
