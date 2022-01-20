import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const colorsByStatus = {
  IN_FAVOR: 'inFavor',
  DEBT: 'debt',
};

const Avatar = ({
  image = 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
  userName,
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
        {userName && <Text style={styles.userName}>{userName}</Text>}
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
  userName: {
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    lineHeight: 12,
    fontSize: 10,
    backgroundColor: Colors.black,
    color: Colors.white,
  },
  inFavor: {
    borderColor: 'green',
  },
  debt: {
    borderColor: 'red',
  },
});

export default Avatar;
