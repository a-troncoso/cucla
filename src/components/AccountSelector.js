import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Avatar, {sizes} from 'components/Avatar';
import {colors} from 'utils/colors';
import AddUserImage from '../assets/add-user_solid.svg';

const AccountSelector = ({
  accounts = [],
  userIdLogged,
  onSelectAccount = null,
  onPressAddUser = null,
}) => {
  const renderItem = ({item}) => {
    return (
      <AccountItem
        users={item.users}
        userIdLogged={userIdLogged}
        onPressAvatar={() => onSelectAccount(item.id)}
      />
    );
  };

  return (
    <View style={styles.mainView}>
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={accounts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <Avatar
            image={<AddUserImage style={styles.avatarHeader} />}
            onPress={onPressAddUser}
          />
        }
        ListHeaderComponentStyle={styles.listHeaderComponent}
        showsHorizontalScrollIndicator={false}
        horizontal
      />
    </View>
  );
};

const AccountItem = ({users, userIdLogged, onPressAvatar}) => {
  return (
    <View style={styles.accountItemView}>
      <Avatar
        image={users.find(user => user.id !== userIdLogged)?.imagePath}
        userName={users.find(user => user.id !== userIdLogged)?.name}
        size={sizes.SMALL_MEDIUM}
        avatarContainerStyle={styles.avatar}
        onPress={onPressAvatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: 96,
    paddingHorizontal: 24,
    backgroundColor: colors.secondary,
  },
  listContentContainer: {alignItems: 'center'},
  accountItemView: {
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  accountItemSeparator: {
    borderColor: colors.white,
    borderLeftWidth: 1,
  },
  avatar: {
    borderWidth: 0,
  },
  avatarHeader: {
    width: 48,
    height: 48,
    color: colors.white,
  },
  listHeaderComponent: {marginRight: 16},
});

export default AccountSelector;
