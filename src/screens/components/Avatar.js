/**
 * Sample React Native Avatar
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';

const colorsByStatus = {
  IN_FAVOR: 'inFavor',
  DEBT: 'debt',
};

const Avatar = ({
  image = 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
  status,
  style,
  avatarStyles,
  onPressImage,
}) => {
  return (
    <View style={[styles.mainView, style]}>
      <TouchableOpacity style={styles.avatarBtn} onPress={onPressImage}>
        <Image
          source={{uri: image}}
          style={[
            styles.avatarImage,
            styles[colorsByStatus[status]],
            avatarStyles,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
  },
  avatarBtn: {alignItems: 'center'},
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
  debt: {
    borderColor: 'red',
  },
});

export default Avatar;
