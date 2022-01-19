import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Home from 'screens/Home/Home';
import AccountSelector from 'components/AccountSelector';
import {useAccount} from 'hooks/useAccount';

const initialSelectedAccountId = 1;
const userIdLogged = 1;

const App = () => {
  const [selectedAccountId, setSelectedAccountId] = useState(
    initialSelectedAccountId,
  );
  const {accounts} = useAccount({accountId: selectedAccountId});

  const handleSelectAccount = accountId => {
    setSelectedAccountId(accountId);
  };

  return (
    <View style={styles.mainView}>
      <Home accountId={selectedAccountId} />
      <AccountSelector
        accounts={accounts}
        userIdLogged={userIdLogged}
        onSelectAccount={id => handleSelectAccount(id)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {justifyContent: 'space-around', flex: 1},
});

export default App;
