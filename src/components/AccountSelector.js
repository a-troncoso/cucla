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
        contentContainerStyle={{alignItems: 'center'}}
        data={accounts}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <Avatar
            image={<AddUserImage style={styles.avatarHeader} />}
            onPressImage={onPressAddUser}
          />
        }
        ListHeaderComponentStyle={{marginRight: 16}}
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
        image={users.find(user => user.id !== userIdLogged).imagePath}
        userName={users.find(user => user.id !== userIdLogged).name}
        size={sizes.SMALL_MEDIUM}
        avatarContainerStyle={styles.avatar}
        onPressImage={onPressAvatar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    backgroundColor: colors.secondary,
  },
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
});

export default AccountSelector;
