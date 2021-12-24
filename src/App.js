/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image} from 'react-native';
import Home from './screens/Home/Home';

const selectedAccountId = 1;

const App = () => {
  return <Home accountId={selectedAccountId} />;
};

export default App;
