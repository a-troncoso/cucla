// import {useEffect, useState} from 'react';
import {useUsers} from 'hooks/useUsers';

const useModeEditUser = ({userId = null, onEditUser = () => {}}) => {
  const {updateUser} = useUsers();

  const handleEditUser = async ({newUserName, imagePath}) => {
    await updateUser({userId, userName: newUserName, imagePath});
    onEditUser();
  };

  return {
    handleEditUser,
  };
};

export default useModeEditUser;
