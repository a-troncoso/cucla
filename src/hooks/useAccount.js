import {useEffect, useState} from 'react';
import {useDatabase} from './useDatabase';
import {groupBy} from 'utils/array';

export const useAccount = ({accountId = null}) => {
  const {getDB, exQuery} = useDatabase();
  const [accounts, setAccounts] = useState([]);
  const [account, setAccount] = useState({users: [], debtUser: {}, debt: 0});

  const findAccounts = async () => {
    try {
      const result = await exQuery(
        getDB(),
        `SELECT a.id, u.id userId, u.name userName, u.imagePath userImagePath
        FROM account a
        LEFT JOIN user_account ua ON a.id = ua.accountId
        LEFT JOIN user u on u.id = ua.userId;`,
      );
      const groupedById = groupBy(result, 'id');

      const process = Object.keys(groupedById).map(id => ({
        id: parseInt(id, 10),
        users: groupedById[id].map(({userId, userName, userImagePath}) => ({
          id: parseInt(userId, 10),
          name: userName,
          imagePath: userImagePath,
        })),
      }));

      setAccounts(process);
    } catch (e) {
      console.error(e);
    }
  };

  const findAccountById = async () => {
    try {
      const sumAmountsByUser = await exQuery(
        getDB(),
        `SELECT u.id, u.name, u.imagePath, SUM(CASE WHEN m.active = 1 THEN  m.amount ELSE 0 END) sumAmount 
        FROM user u
        LEFT JOIN movement m ON u.id = m.payingUserId
        LEFT JOIN user_account ua ON u.id = ua.userId
        WHERE ua.accountId = ${accountId}
        GROUP BY u.id, u.name
        ORDER BY sumAmount DESC;`,
      );

      const updatedDebt = await exQuery(
        getDB(),
        `SELECT updatedDebt FROM account WHERE id = ${accountId};`,
      );

      setAccount({
        users: sumAmountsByUser,
        debt: updatedDebt.length > 0 ? updatedDebt[0].updatedDebt : 0,
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    findAccounts();
  }, []);

  useEffect(() => {
    findAccountById();
  }, [accountId]);

  return {accounts, account, findAccounts, findAccountById};
};
