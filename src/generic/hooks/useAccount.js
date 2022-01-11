import {useEffect, useState} from 'react';
import {useDatabase} from './useDatabase';

export const useAccount = ({accountId}) => {
  const {getDB, exQuery} = useDatabase();
  const [account, setAccount] = useState({users: [], debtUser: {}, debt: 0});

  const findAccountById = async () => {
    try {
      const sumAmountsByUser = await exQuery(
        getDB(),
        `SELECT u.id, u.name, u.imagePath, SUM(CASE WHEN m.active = 1 THEN  m.amount ELSE 0 END) sumAmount 
        FROM user u
        LEFT JOIN movement m ON u.id = m.payingUserId
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
    findAccountById();
  }, []);

  return {account, findAccountById};
};
