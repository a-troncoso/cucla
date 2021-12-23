/**
 * Sample React Native Avatar
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Image, TouchableWithoutFeedback} from 'react-native';

const colorsByStatus = {
  IN_FAVOR: 'inFavor',
  AGAINST: 'against',
};

const Avatar = ({
  image = 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
  status,
  style,
  onPressImage,
}) => {
  return (
    <View style={[styles.mainView, style]}>
      <TouchableWithoutFeedback
        style={{borderWidth: 1, borderColor: '#000'}}
        onPress={onPressImage}>
        <Image
          source={{uri: image}}
          style={[styles.avatarImage, styles[colorsByStatus[status]]]}
        />
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    // borderWidth: 1,
    alignItems: 'center',
  },
  avatarImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: 'black',
  },
  inFavor: {
    borderColor: 'green',
  },
  against: {
    borderColor: 'red',
  },
});

export default Avatar;
