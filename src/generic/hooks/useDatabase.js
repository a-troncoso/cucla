import {openDatabase} from 'react-native-sqlite-storage';

const DB_NAME = 'SQLite.db';

export const useDatabase = () => {
  const getAppDB = () => {
    return openDatabase(
      {name: DB_NAME, location: 'default', createFromLocation: `~${DB_NAME}`},
      null,
      e => {
        console.error(e);
      },
    );
  };

  const exQuery = (db, sql) => {
    console.log(sql);

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
            resolve(data);
          },
          error => reject(error),
        );
      });
    });
  };

  const fetch = () => {};

  const add = () => {};

  return {getAppDB, exQuery};
};
