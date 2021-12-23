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
  // return (
  //   <Image
  //     source={{
  //       uri: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Everest_North_Face_toward_Base_Camp_Tibet_Luca_Galuzzi_2006_edit_1.jpg',
  //     }}
  //     style={{width: 100, height: 100}}
  //   />
  // );
};

export default App;
