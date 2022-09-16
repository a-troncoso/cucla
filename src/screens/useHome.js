import {useState, useEffect} from 'react';
import useModeEditUser from 'modules/user/useModeEditUser';
import useAccount from 'hooks/useAccount';
import {USER_OPTIONS} from 'components/modalUserOptions/ModalUserOptions';

const useHome = ({accountId, onUpdateUser = () => {}}) => {
  const [isVisibleModalUserOptions, setIsVisibleModalUserOptions] =
    useState(false);
  const [isVisibleModalUser, setIsVisibleModalUser] = useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const [userAttributeToEdit, setUserAttributeToEdit] = useState(
    USER_OPTIONS[1].name,
  );
  const {handleEditUser} = useModeEditUser({
    userId: userIdToEdit,
    attributeToEdit: userAttributeToEdit,
    onEditUser: () => {
      onUpdateUser();
      setIsVisibleModalUser(false);
    },
  });
  const {account, findAccountById} = useAccount({accountId});
  console.log('account', account);

  const handleLongPressImage = user => {
    setIsVisibleModalUserOptions(true);
    setUserIdToEdit(user.id);
  };

  const handleRequestCloseModalUserOptions = () => {
    setIsVisibleModalUserOptions(false);
  };

  const handlePressOptionModalUserOptions = ({name}) => {
    setUserAttributeToEdit(name);
    setIsVisibleModalUser(true);
    setIsVisibleModalUserOptions(false);
  };

  const handleRequestCloseModalUser = () => {
    setIsVisibleModalUser(false);
  };

  useEffect(() => {
    console.log('accountId', accountId);
    findAccountById(accountId);
  }, []);

  return {
    account,
    userIdToEdit,
    userAttributeToEdit,
    isVisibleModalUserOptions,
    isVisibleModalUser,
    findAccountById,
    handleLongPressImage,
    handleRequestCloseModalUserOptions,
    handlePressOptionModalUserOptions,
    handleRequestCloseModalUser,
    handleEditUser,
  };
};

export default useHome;
