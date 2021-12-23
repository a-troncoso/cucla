import React, {useEffect, useState} from 'react';
import {useDatabase} from './useDatabase';

export const useUsers = () => {
  const {getDB, exQuery} = useDatabase();
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const r = await exQuery(getDB(), `SELECT * FROM user`);
      setUsers(r);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {users};
};
