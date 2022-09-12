// import {useEffect, useState} from 'react';
import {useUsers} from 'hooks/useUsers';
import {useEffect} from 'react';

const useModeEditUser = ({userId = null, onEditUser = () => {}}) => {
  const {updateUser} = useUsers();

  const handleEditUser = async ({newUserName}) => {
    const r = await updateUser({userId, userName: newUserName});
    onEditUser();
  };

  return {
    handleEditUser,
  };
};

export default useModeEditUser;
