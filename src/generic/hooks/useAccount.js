import {useEffect, useState} from 'react';
import {useDatabase} from './useDatabase';

export const useAccount = ({accountId}) => {
  const {getDB, exQuery} = useDatabase();
  const [account, setAccount] = useState({users: [], debtUser: {}, debt: 0});

  const findAccountById = async () => {
    try {
      const sumAmountsByUser = await exQuery(
        getDB(),
        `SELECT u.id,u.name, u.imagePath, SUM(m.amount) 'sum_amount' FROM user u JOIN movement m ON u.id = m.payingUserId WHERE m.accountId = ${accountId} GROUP BY u.id, u.name, u.imagePath ORDER BY sum_amount DESC;`,
      );
      const updatedDebt = await exQuery(
        getDB(),
        `SELECT updatedDebt FROM account WHERE id = ${accountId};`,
      );

      setAccount({
        users: sumAmountsByUser,
        debtUser: sumAmountsByUser[1],
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
