import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Avatar from 'components/Avatar';
import {colors} from 'utils/colors';
import AddUserImage from 'assets/add-user.svg';

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
            avatarStyles={styles.avatarHeader}
            image={AddUserImage}
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
        avatarStyles={styles.avatar}
        image={users.find(user => user.id !== userIdLogged).imagePath}
        onPressImage={onPressAvatar}
        userName={users.find(user => user.id !== userIdLogged).name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingVertical: 12,
    paddingHorizontal: 16,
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
    width: 56,
    height: 56,
    borderWidth: 0,
  },
  avatarHeader: {
    width: 48,
    height: 48,
    borderRadius: 0,
    borderWidth: 0,
  },
});

export default AccountSelector;
