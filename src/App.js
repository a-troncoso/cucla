import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Home from 'screens/home/Home';
import EmptyAccounts from 'screens/home/components/emptyAccounts/EmptyAccounts';
import AccountSelector from 'components/AccountSelector';
import ModalUser from 'components/modalUser/ModalUser';
import {useApp} from 'hooks/useApp';
import useAccount from 'hooks/useAccount';
import {useUsers} from 'hooks/useUsers';

export const userIdLogged = 1;

const App = () => {
  useApp({userIdLogged});
  const [isVisibleModalUser, setIsVisibleModalUser] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [accounts, setAccounts] = useState({users: [], debtUser: {}, debt: 0});
  const {findAccounts} = useAccount();
  const {registerUser} = useUsers({
    userIdLogged,
  });

  const handleSelectAccount = accountId => {
    setSelectedAccountId(accountId);
  };

  const handlePressAddUser = () => {
    setIsVisibleModalUser(true);
  };

  const handleSubmitAddUser = async ({userName, imagePath}) => {
    const newUserAccountData = await registerUser({userName, imagePath});
    const accountsData = await findAccounts();
    setAccounts(accountsData);
    setSelectedAccountId(newUserAccountData.newAccount.insertId);
    setIsVisibleModalUser(false);
  };

  const handleRequestCloseModal = () => {
    setIsVisibleModalUser(false);
  };

  const handleUpdateUser = async () => {
    const accountsData = await findAccounts();
    setAccounts(accountsData);
  };

  const handleRemoveAccount = async () => {
    const accountsData = await findAccounts();
    const accountsQuantity = accountsData.length;

    setAccounts(accountsData);

    if (accountsQuantity > 0) setSelectedAccountId(accountsData[0].id);
  };

  const handleMountApp = async () => {
    const accountsData = await findAccounts();
    const accountsQuantity = accountsData.length;

    setAccounts(accountsData);

    if (accountsQuantity > 0) setSelectedAccountId(accountsData[0].id);
  };

  useEffect(() => {
    handleMountApp();
  }, []);

  return (
    <View style={styles.mainView}>
      {accounts.length > 0 ? (
        <Home
          accountId={selectedAccountId}
          onUpdateUser={handleUpdateUser}
          onRemoveAccount={handleRemoveAccount}
        />
      ) : (
        <EmptyAccounts />
      )}

      <AccountSelector
        accounts={accounts}
        userIdLogged={userIdLogged}
        onSelectAccount={handleSelectAccount}
        onPressAddUser={handlePressAddUser}
      />

      <ModalUser
        isVisible={isVisibleModalUser}
        onSubmit={handleSubmitAddUser}
        onAddUser={handleSubmitAddUser}
        onRequestClose={handleRequestCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {flex: 1},
});

export default App;
