import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Home from 'screens/Home/Home';
import AccountSelector from 'components/AccountSelector';
import ModalAddUser from 'components/ModalAddUser';
import {useAccount} from 'hooks/useAccount';
import {useUsers} from 'hooks/useUsers';

const initialSelectedAccountId = 1;
const userIdLogged = 1;

const App = () => {
  const [modalAddUser, setModalAddUser] = useState({
    isVisible: false,
  });
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
    setModalAddUser(prev => ({
      ...prev,
      isVisible: true,
    }));
  };

  const handleSubmitAddUser = ({name, imagePath}) => {
    // console.log('{name, imagePath}', {name, imagePath});
    // {"code": 0, "message": "NOT NULL constraint failed: user_account.id (code 1299 SQLITE_CONSTRAINT_NOTNULL)"}
    registerUser({name, imagePath});
    setModalAddUser(prev => ({
      ...prev,
      isVisible: false,
    }));
  };

  const handleRequestCloseModal = () => {
    setModalAddUser(prevState => ({
      ...prevState,
      isVisible: false,
    }));
  };

  return (
    <View style={styles.mainView}>
      <Home accountId={selectedAccountId} />

      <AccountSelector
        accounts={accounts}
        userIdLogged={userIdLogged}
        onSelectAccount={id => handleSelectAccount(id)}
        onPressAddUser={handlePressAddUser}
      />

      <ModalAddUser
        isVisible={modalAddUser.isVisible}
        onSubmit={handleSubmitAddUser}
        onRequestClose={handleRequestCloseModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {flex: 1},
});

export default App;
