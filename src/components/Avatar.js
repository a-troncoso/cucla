import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {colors} from 'utils/colors';

const colorsByStatus = {
  IN_FAVOR: 'inFavor',
  DEBT: 'debt',
};

export const sizes = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  EXTRA_LARGE: 'extraLarge',
};

const Avatar = ({
  image = 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
  userName,
  status,
  size = sizes.EXTRA_LARGE,
  containerStyle,
  avatarContainerStyle,
  onPressImage,
}) => {
  return (
    <View style={[styles.mainView, containerStyle]}>
      <TouchableOpacity style={styles.avatarBtn} onPress={onPressImage}>
        {typeof image === 'string' ? (
          <Image
            source={{uri: image}}
            style={[
              styles.avatar,
              styles[colorsByStatus[status]],
              styles[size],
              avatarContainerStyle,
            ]}
          />
        ) : (
          <View style={[styles.avatarContainerStyle, avatarContainerStyle]}>
            {image}
          </View>
        )}
        {userName && <Text style={styles.userName}>{userName}</Text>}
      </TouchableOpacity>
    </View>
  );
};

const stylesBySize = {
  [sizes.SMALL]: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
  },
  [sizes.MEDIUM]: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
  },
  [sizes.LARGE]: {
    width: 144,
    height: 144,
    borderRadius: 72,
    borderWidth: 6,
  },
  [sizes.EXTRA_LARGE]: {
    width: 192,
    height: 192,
    borderRadius: 96,
    borderWidth: 8,
  },
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
  },
  avatarBtn: {alignItems: 'center'},
  avatar: {
    borderColor: 'black',
  },
  userName: {
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    lineHeight: 12,
    fontSize: 10,
    backgroundColor: colors.black,
    color: colors.white,
  },
  inFavor: {
    borderColor: colors.success,
  },
  debt: {
    borderColor: colors.error,
  },
  ...stylesBySize,
});

export default Avatar;
