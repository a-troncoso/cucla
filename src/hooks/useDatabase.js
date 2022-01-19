import {openDatabase} from 'react-native-sqlite-storage';

const DB_NAME = 'SQLite.db';

export const useDatabase = () => {
  const getDB = () => {
    return openDatabase(
      {name: DB_NAME, location: 'default', createFromLocation: `~${DB_NAME}`},
      null,
      e => {
        console.error(e);
      },
    );
  };

  const exQuery = (db, sql) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          sql,
          [],
          (trans, results) => {
            let data = [];
            for (let i = 0; i < results.rows.length; i++) {
              data.push(results.rows.item(i));
            }

            const isInsertStatement = results.insertId ? true : false;
            data = isInsertStatement ? {insertId: results.insertId} : data;
            resolve(data);
          },
          error => reject(error),
        );
      });
    });
  };

  const fetch = () => {};

  const add = () => {};

  return {getDB, exQuery};
};
