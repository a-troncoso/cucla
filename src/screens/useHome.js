import {useState, useEffect} from 'react';
import useModeEditUser from 'modules/user/useModeEditUser';
import useAccount from 'hooks/useAccount';
import {useUsers} from 'hooks/useUsers';
import {USER_OPTIONS} from 'components/modalUserOptions/ModalUserOptions';

const useHome = ({
  accountId,
  onUpdateUser = () => {},
  onRemoveAccount = () => {},
}) => {
  const [isVisibleModalUserOptions, setIsVisibleModalUserOptions] =
    useState(false);
  const [isVisibleModalUser, setIsVisibleModalUser] = useState(false);
  const [isVisibleModalConfirmation, setIsVisibleModalConfirmation] =
    useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const [userAttributeToEdit, setUserAttributeToEdit] = useState(
    USER_OPTIONS[1].name,
  );
  const {handleEditUser} = useModeEditUser({
    userId: userIdToEdit,
    attributeToEdit: userAttributeToEdit,
    onEditUser: () => {
      onUpdateUser();
      findAccountById(accountId);
      setIsVisibleModalUser(false);
    },
  });
  const {account, findAccountById} = useAccount({accountId});
  const {deactivateAccount} = useUsers();

  const handleLongPressImage = user => {
    setIsVisibleModalUserOptions(true);
    setUserIdToEdit(user.id);
  };

  const handleRequestCloseModalUserOptions = () => {
    setIsVisibleModalUserOptions(false);
  };

  const handlePressOptionModalUserOptions = ({name, optionId}) => {
    setIsVisibleModalUserOptions(false);

    // Si se escoge Eliminar Usuario, se abre modal de confirmación
    // si no, se abre Modal User
    if (optionId === USER_OPTIONS[2].id) setIsVisibleModalConfirmation(true);
    else {
      setUserAttributeToEdit(name);
      setIsVisibleModalUser(true);
    }
  };

  const handleRequestCloseModalUser = () => {
    setIsVisibleModalUser(false);
  };

  const handlePressNegativeSelection = () => {
    setIsVisibleModalConfirmation(false);
  };

  const handleRequestCloseModalConfirmation = () => {
    setIsVisibleModalConfirmation(false);
  };

  const handleRemoveAccount = async ({accountId}) => {
    setIsVisibleModalConfirmation(false);
    await deactivateAccount({accountId});
    onRemoveAccount();
  };

  useEffect(() => {
    findAccountById(accountId);
  }, [accountId]);

  return {
    account,
    userIdToEdit,
    userAttributeToEdit,
    isVisibleModalUserOptions,
    isVisibleModalUser,
    isVisibleModalConfirmation,
    findAccountById,
    handleLongPressImage,
    handleRequestCloseModalUserOptions,
    handlePressOptionModalUserOptions,
    handleRemoveAccount,
    handleRequestCloseModalUser,
    handlePressNegativeSelection,
    handleRequestCloseModalConfirmation,
    handleEditUser,
  };
};

export default useHome;
