import {useState, useEffect} from 'react';
import {AVATAR_STATUS} from 'components/Avatar';
import useModeEditUser from 'modules/user/useModeEditUser';
import useAccount from 'hooks/useAccount';
import {useUsers} from 'hooks/useUsers';
import {useMovements} from 'hooks/useMovements';
import {USER_OPTIONS} from 'components/modalUserOptions/ModalUserOptions';
import {MODAL_MOVEMENT_MODES} from 'components/modalAddMovement/ModalAddMovement';

const useHome = ({
  accountId,
  onUpdateUser = () => {},
  onRemoveAccount = () => {},
}) => {
  const [modalMovement, setModalMovement] = useState({
    isVisible: false,
    user: {id: null, imagePath: null, status: null},
  });
  const [isVisibleModalUserOptions, setIsVisibleModalUserOptions] =
    useState(false);
  const [isVisibleModalUser, setIsVisibleModalUser] = useState(false);
  const [isVisibleModalConfirmation, setIsVisibleModalConfirmation] =
    useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const [movementIdToEdit, setMovementIdToEdit] = useState(null);
  const [userAttributeToEdit, setUserAttributeToEdit] = useState(
    USER_OPTIONS[1].name,
  );
  const [modeModalMovement, setModeModalMovement] = useState(
    MODAL_MOVEMENT_MODES.ADD,
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
  const {deactivateAccount, fetchUser} = useUsers();
  const {
    movements,
    fetchMovements,
    removeMovement,
    fetchMovementById,
    registerMovement,
    editMovement,
  } = useMovements();

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

  const handleChangeMovementAmount = async movementId => {
    const movement = await fetchMovementById(movementId);
    const payingUser = await fetchUser(movement.payingUserId);

    setModalMovement(prev => ({
      ...prev,
      isVisible: true,
      user: {
        id: payingUser.id,
        imagePath: payingUser.imagePath,
        status: AVATAR_STATUS.debt,
      },
    }));
    setMovementIdToEdit(movementId);
    setModeModalMovement(MODAL_MOVEMENT_MODES.EDIT);
  };

  const handleRequestCloseModalMovement = () => {
    setModalMovement(prevState => ({
      ...prevState,
      isVisible: false,
    }));
  };

  const handleAddMovement = async amount => {
    setModalMovement(prevState => ({
      ...prevState,
      isVisible: false,
    }));

    await registerMovement({
      amount,
      payingUserId: modalMovement.user.id,
      debtUserId: account.users.find(u => u.id !== modalMovement.user.id).id,
      accountId,
    });

    findAccountById(accountId);
    fetchMovements({accountId});
  };

  const handleEditMovement = async ({amount}) => {
    setModalMovement(prevState => ({
      ...prevState,
      isVisible: false,
    }));

    await editMovement({
      movementId: movementIdToEdit,
      amount,
    });

    fetchMovements({accountId});
    // Buscamos la cuenta para actualizar el contador que refleja lo q se deben
    findAccountById(accountId);
  };

  const handlePressImage = user => {
    setModalMovement(prevState => ({
      ...prevState,
      isVisible: true,
      user: {...prevState.user, ...user},
    }));
  };

  const handleRemoveMovement = async id => {
    await removeMovement({id});
    findAccountById(accountId);
    fetchMovements({accountId});
  };

  useEffect(() => {
    findAccountById(accountId);
    fetchMovements({accountId});
  }, [accountId]);

  return {
    account,
    userIdToEdit,
    userAttributeToEdit,
    movementIdToEdit,
    modeModalMovement,
    isVisibleModalUserOptions,
    isVisibleModalUser,
    isVisibleModalConfirmation,
    modalMovement,
    movements,
    handleLongPressImage,
    handleRequestCloseModalUserOptions,
    handlePressOptionModalUserOptions,
    handleRemoveAccount,
    handleRequestCloseModalUser,
    handlePressNegativeSelection,
    handleRequestCloseModalConfirmation,
    handleEditUser,
    handleChangeMovementAmount,
    handleRequestCloseModalMovement,
    handleAddMovement,
    handleEditMovement,
    handlePressImage,
    handleRemoveMovement,
  };
};

export default useHome;
