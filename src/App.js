import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Home from 'screens/Home';
import AccountSelector from 'components/AccountSelector';
import ModalUser from 'components/modalUser/ModalUser';
import {useApp} from 'hooks/useApp';
import useAccount from 'hooks/useAccount';
import {useUsers} from 'hooks/useUsers';

const initialSelectedAccountId = 1;
export const userIdLogged = 1;

const App = () => {
  useApp({userIdLogged});
  const [isVisibleModalUser, setIsVisibleModalUser] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState(
    initialSelectedAccountId,
  );
  const {accounts, findAccounts} = useAccount({accountId: selectedAccountId});
  const {registerUser} = useUsers({
    userIdLogged,
    onSuccessUserRegistration: findAccounts,
  });

  const handleSelectAccount = accountId => {
    setSelectedAccountId(accountId);
  };

  const handlePressAddUser = () => {
    setIsVisibleModalUser(true);
  };

  const handleSubmitAddUser = ({userName, imagePath}) => {
    console.log({userName, imagePath});
    registerUser({userName, imagePath});
    setIsVisibleModalUser(false);
  };

  const handleRequestCloseModal = () => {
    setIsVisibleModalUser(false);
  };

  const handleUpdateUser = () => {
    findAccounts();
  };

  const handleRemoveAccount = () => {
    findAccounts();
  };

  return (
    <View style={styles.mainView}>
      <Home
        accountId={selectedAccountId}
        onUpdateUser={handleUpdateUser}
        onRemoveAccount={handleRemoveAccount}
      />

      <AccountSelector
        accounts={accounts}
        userIdLogged={userIdLogged}
        onSelectAccount={id => handleSelectAccount(id)}
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
