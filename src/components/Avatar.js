import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
  Vibration,
} from 'react-native';
import {colors} from 'utils/colors';

export const AVATAR_STATUS = {
  inFavor: 'inFavor',
  debt: 'debt',
};

export const sizes = {
  SMALL: 'small',
  SMALL_MEDIUM: 'smallMedium',
  MEDIUM: 'medium',
  LARGE: 'large',
  EXTRA_LARGE: 'extraLarge',
};

const DEFAULT_AVATAR_IMAGE =
  'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png';

const Avatar = ({
  image = DEFAULT_AVATAR_IMAGE,
  userName,
  status,
  size = sizes.EXTRA_LARGE,
  containerStyle,
  avatarContainerStyle,
  onPress,
  onLongPress,
}) => {
  const AvatarContainer = onPress || onLongPress ? TouchableOpacity : View;

  const handleLongPress = () => {
    Vibration.vibrate(48);

    if (onLongPress) onLongPress();
  };

  return (
    <View style={[styles.mainView, containerStyle]}>
      <AvatarContainer
        style={styles.avatarBtn}
        onPress={onPress}
        onLongPress={handleLongPress}>
        {typeof image === 'string' ? (
          <Image
            source={{uri: image || DEFAULT_AVATAR_IMAGE}}
            style={[
              styles.avatar,
              styles[AVATAR_STATUS[status]],
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
      </AvatarContainer>
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
  [sizes.SMALL_MEDIUM]: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  [sizes.MEDIUM]: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  [sizes.LARGE]: {
    width: 144,
    height: 144,
    borderRadius: 72,
  },
  [sizes.EXTRA_LARGE]: {
    width: 192,
    height: 192,
    borderRadius: 96,
  },
};

const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
  },
  avatarBtn: {alignItems: 'center'},
  avatar: {
    borderWidth: 4,
  },
  userName: {
    width: '100%',
    textAlign: 'center',
    position: 'absolute',
    bottom: 0,
    fontSize: 10,
    letterSpacing: 0.5,
    backgroundColor: colors.secondary,
    color: colors.white,
    fontWeight: 'bold',
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
