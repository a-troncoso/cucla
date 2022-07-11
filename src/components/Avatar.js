import React from 'react';
import {StyleSheet, View, Image, TouchableOpacity, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {colors} from 'utils/colors';

const colorsByStatus = {
  IN_FAVOR: 'inFavor',
  DEBT: 'debt',
};

const Avatar = ({
  image = 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
  userName,
  status,
  containerStyle,
  avatarContainerStyles,
  onPressImage,
}) => {
  return (
    <View style={[styles.mainView, containerStyle]}>
      <TouchableOpacity style={styles.avatarBtn} onPress={onPressImage}>
        {typeof image === 'string' ? (
          <Image
            source={{uri: image}}
            style={[
              styles.avatarContainerStyles,
              styles[colorsByStatus[status]],
              avatarContainerStyles,
            ]}
          />
        ) : (
          <View style={[styles.avatarContainerStyles, avatarContainerStyles]}>
            {image}
          </View>
        )}
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
  avatarContainerStyles: {
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
    backgroundColor: colors.black,
    color: colors.white,
  },
  inFavor: {
    borderColor: colors.success,
  },
  debt: {
    borderColor: colors.error,
  },
});

export default Avatar;
