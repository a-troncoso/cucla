import {useEffect, useState} from 'react';
import {useDatabase} from './useDatabase';

export const useUsers = ({
  userIdLogged = null,
  onSuccessUserRegistration = null,
} = {}) => {
  const {getDB, exQuery} = useDatabase();
  const [users, setUsers] = useState([]);
  const [userRegistrationResult, setUserRegistrationResult] = useState({
    insertId: null,
    rowsAffected: 0,
  });
  const [accountRegistrationResult, setAccountRegistrationResult] = useState({
    insertId: null,
    rowsAffected: 0,
  });
  const [userAccountAssociationResult, setUserAccountAssociationResult] =
    useState({
      rowsAffected: 0,
    });

  useEffect(() => {
    if (userRegistrationResult.rowsAffected) registerNewAccount();
  }, [userRegistrationResult]);

  useEffect(() => {
    if (accountRegistrationResult.rowsAffected) {
      registerUserAccountAssociation({
        userId: userRegistrationResult.insertId,
        accountId: accountRegistrationResult.insertId,
      });

      registerUserAccountAssociation({
        userId: userIdLogged,
        accountId: accountRegistrationResult.insertId,
      });
    }
  }, [accountRegistrationResult, userRegistrationResult]);

  useEffect(() => {
    if (userAccountAssociationResult.rowsAffected) onSuccessUserRegistration();
  }, [userAccountAssociationResult]);

  const fetchUsers = async () => {
    try {
      const r = await exQuery(getDB(), `SELECT * FROM user`);
      setUsers(r);
    } catch (e) {
      console.error(e);
    }
  };

  const registerUser = async ({name, imagePath}) => {
    const image = imagePath ?? '';
    const queryStatement = `INSERT INTO "user" ("name", "imagePath") VALUES ("${name}", "${image}")`;

    try {
      const res = await exQuery(getDB(), queryStatement);
      setUserRegistrationResult(res);
    } catch (e) {
      console.error(e);
    }
  };

  const registerLoggedUser = async ({id, name, imagePath}) => {
    const image = imagePath ?? '';
    const queryStatement = `INSERT INTO user ("id", "name", "imagePath") VALUES (${id}, "${name}", "${image}")`;

    try {
      await exQuery(getDB(), queryStatement);
    } catch (e) {
      console.error(e);
    }
  };

  const registerNewAccount = async () => {
    try {
      const res = await exQuery(
        getDB(),
        'INSERT INTO "account" DEFAULT VALUES;',
      );
      setAccountRegistrationResult(res);
    } catch (e) {
      console.error(e);
    }
  };

  const registerUserAccountAssociation = async ({userId, accountId}) => {
    try {
      const res = await exQuery(
        getDB(),
        `INSERT INTO "user_account" ("userId", "accountId") VALUES (${userId}, ${accountId});`,
      );
      setUserAccountAssociationResult(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {users, registerUser, registerLoggedUser};
};
