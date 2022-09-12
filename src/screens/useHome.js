import {useState} from 'react';
import useModeEditUser from 'modules/user/useModeEditUser';

const useHome = ({onUpdateUser}) => {
  const [isVisibleModalUserOptions, setIsVisibleModalUserOptions] =
    useState(false);
  const [isVisibleModalUser, setIsVisibleModalUser] = useState(false);
  const [userIdToEdit, setUserIdToEdit] = useState(null);
  const {handleEditUser} = useModeEditUser({
    userId: userIdToEdit,
    // attributeToEdit: userAttributeToEdit,
    onEditUser: () => {
      onUpdateUser();
      setIsVisibleModalUser(false);
    },
  });

  const handleLongPressImage = user => {
    setIsVisibleModalUserOptions(true);
    setUserIdToEdit(user.id);
  };

  const handleRequestCloseModalUserOptions = () => {
    setIsVisibleModalUserOptions(false);
  };

  const handlePressOptionModalUserOptions = () => {
    setIsVisibleModalUserOptions(false);
    setIsVisibleModalUser(true);
  };

  const handleRequestCloseModalUser = () => {
    setIsVisibleModalUser(false);
  };

  return {
    userIdToEdit,
    isVisibleModalUserOptions,
    isVisibleModalUser,
    handleLongPressImage,
    handleRequestCloseModalUserOptions,
    handlePressOptionModalUserOptions,
    handleRequestCloseModalUser,
    handleEditUser,
  };
};

export default useHome;
