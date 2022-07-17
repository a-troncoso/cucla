import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  useColorScheme,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import GestureRecognizer from 'react-native-swipe-gestures';
import Avatar, {sizes} from '../../components/Avatar';
import {toCurrencyFormat} from 'utils/number';

const gestureRecognizerConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

const ModalMovements = ({
  isVisible,
  movements,
  onRequestClose,
  onRemoveMovement,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const handleSwipeRightMovement = (movementId, payingUserName) => {
    Alert.alert(
      'Eliminar movimiento',
      `¿Estás seguro de eliminar el movimiento de ${payingUserName}?`,
      [
        {
          text: 'No',
        },
        {text: 'Si', onPress: () => onRemoveMovement(movementId)},
      ],
    );
  };

  const renderItem = ({item}) => {
    return (
      <Movement
        id={item.id}
        payingUserImage={item.payingUserImagePath}
        debtUserImagePath={item.debtUserImagePath}
        amount={item.amount}
        onSwipeRight={() =>
          handleSwipeRightMovement(item.id, item.payingUserName)
        }
      />
    );
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      style={[styles.mainView, isDarkMode ? styles.dark : styles.light]}
      onRequestClose={onRequestClose}>
      <SafeAreaView
        style={[isDarkMode ? styles.dark : styles.light, styles.listContainer]}>
        <FlatList
          data={movements}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </SafeAreaView>
    </Modal>
  );
};

const Movement = ({
  payingUserImage,
  debtUserImagePath,
  amount,
  onSwipeRight,
}) => {
  return (
    <GestureRecognizer
      style={styles.gestureRecognizer}
      config={gestureRecognizerConfig}
      onSwipeRight={onSwipeRight}>
      <View style={styles.movementContainer}>
        <Avatar
          status="IN_FAVOR"
          image={payingUserImage}
          containerStyle={styles.avatarContainer}
          size={sizes.SMALL}
        />
        <Text style={styles.amount}>{toCurrencyFormat(amount)}</Text>
        <Avatar
          status="DEBT"
          containerStyle={styles.avatarContainer}
          image={debtUserImagePath}
          size={sizes.SMALL}
        />
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  light: {backgroundColor: Colors.lighter},
  dark: {backgroundColor: Colors.darker},
  mainView: {backgroundColor: 'red'},
  listContainer: {
    height: '100%',
  },
  gestureRecognizer: {
    flex: 1,
  },
  avatarContainer: {flex: 1},
  separator: {
    borderColor: Colors.lighter,
    borderWidth: 1,
  },
  movementContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  amount: {flex: 1, textAlign: 'center'},
});

export default ModalMovements;
