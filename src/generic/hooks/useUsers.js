import React, {useEffect, useState} from 'react';
import {useDatabase} from './useDatabase';

export const useUsers = () => {
  const {getAppDB, exQuery} = useDatabase();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const r = await exQuery(getAppDB(), `SELECT * FROM user`);
      console.log(r);
      setUsers(r);
      console.log('r', r);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {users};
};
