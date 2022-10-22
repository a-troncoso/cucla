import {useEffect, useState} from 'react';
import {useDatabase} from './useDatabase';

export const useUsers = ({userIdLogged = null} = {}) => {
  const {getDB, exQuery} = useDatabase();

  const fetchUsers = async () => {
    try {
      const res = await exQuery(
        getDB(),
        `SELECT id, name, imagePath, active FROM user`,
      );
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const fetchUser = async userId => {
    try {
      const r = await exQuery(
        getDB(),
        `SELECT id, imagePath, name, active FROM user WHERE id=${userId}`,
      );
      if (r?.length === 1) return r[0];
      else throw 'No hay usuarios con ese id';
    } catch (e) {
      console.error(e);
    }
  };

  const registerUser = async ({userName, imagePath}) => {
    const image = imagePath ?? '';
    const queryStatement = `INSERT INTO "user" ("name", "imagePath") VALUES ("${userName}", "${image}")`;

    try {
      const newUserData = await exQuery(getDB(), queryStatement);

      const newAccountData = await registerNewAccount();

      await registerUserAccountAssociation({
        userId: newUserData.insertId,
        accountId: newAccountData.insertId,
      });

      await registerUserAccountAssociation({
        userId: userIdLogged,
        accountId: newAccountData.insertId,
      });

      return {
        newUser: newUserData,
        newAccount: newAccountData,
      };
    } catch (e) {
      console.error(e);
    }
  };

  const updateUser = async ({userId, userName, imagePath}) => {
    const queryStatement = `UPDATE "user" SET name="${userName}", imagePath="${imagePath}" WHERE id=${userId};`;

    try {
      const res = await exQuery(getDB(), queryStatement);
      return res;
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

      return res;
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

      return res;
    } catch (e) {
      console.error(e);
    }
  };

  const deactivateAccount = async ({accountId}) => {
    try {
      const queryStatement = `UPDATE "account" SET active=0 WHERE id=${accountId};`;
      const res = await exQuery(getDB(), queryStatement);
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    fetchUsers,
    fetchUser,
    registerUser,
    updateUser,
    registerLoggedUser,
    deactivateAccount,
  };
};
