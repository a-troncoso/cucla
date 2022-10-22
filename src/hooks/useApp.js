import {useEffect} from 'react';
import {useUsers} from './useUsers';

export const useApp = ({userIdLogged}) => {
  const {registerLoggedUser, fetchUsers} = useUsers();

  const registerInitialUser = async () => {
    const users = await fetchUsers();
    const usersQuantity = users.length;
    if (usersQuantity === 0)
      registerLoggedUser({
        id: userIdLogged,
        name: 'yo',
      });
  };

  useEffect(() => {
    registerInitialUser();
  }, []);
};
