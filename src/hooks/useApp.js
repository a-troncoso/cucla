import {useEffect} from 'react';
import {useUsers} from './useUsers';

export const useApp = ({userIdLogged}) => {
  const {registerLoggedUser} = useUsers();

  const registerInitialUser = () => {
    registerLoggedUser({
      id: userIdLogged,
      name: 'User logged',
    });
  };

  useEffect(() => {
    registerInitialUser();
  }, []);
};
