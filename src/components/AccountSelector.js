import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import Avatar from 'components/Avatar';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const AccountSelector = ({accounts, userIdLogged, onSelectAccount}) => {
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
            image="https://cdn-icons.flaticon.com/png/512/1771/premium/1771192.png?token=exp=1642556694~hmac=99c9fb99bfb4e33303cf15c4441217a9"
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
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  accountItemView: {
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  accountItemSeparator: {
    borderColor: Colors.white,
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
