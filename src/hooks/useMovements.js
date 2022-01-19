import {useDatabase} from './useDatabase';
import {useState, useEffect} from 'react';

export const useMovements = (
  {accountId},
  onSuccessRegistration,
  onSuccessRemove,
) => {
  const {getDB, exQuery} = useDatabase();
  const [movements, setMovements] = useState([]);

  const registerMovement = async ({amount, payingUserId, debtUserId}) => {
    try {
      await exQuery(
        getDB(),
        `INSERT INTO "movement"
        ("payingUserId", "debtUserId", "amount", "date", "accountId")
        VALUES
        (${payingUserId}, ${debtUserId}, ${amount}, 'today', ${accountId});`,
      );

      onSuccessRegistration();
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMovements = async () => {
    try {
      const result = await exQuery(
        getDB(),
        `SELECT m.id,
                m.payingUserId, pu.name AS payingUserName,  pu.imagePath AS payingUserImagePath,
                m.debtUserId, du.name AS debtUserName, du.imagePath AS debtUserImagePath,
                m.amount
        FROM movement m
        INNER JOIN user pu ON m.payingUserId = pu.id
        INNER JOIN user du ON m.debtUserId = du.id
        JOIN account a ON a.id = m.accountId
        WHERE m.accountId = ${accountId} AND m.active=1
        ORDER BY date DESC;`,
      );

      setMovements(result);
    } catch (e) {
      console.error(e);
    }
  };

  const removeMovement = async ({id}) => {
    try {
      await exQuery(
        getDB(),
        `UPDATE "movement" SET active = 0 WHERE id = ${id};`,
      );

      onSuccessRemove();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, [accountId]);

  return {registerMovement, movements, fetchMovements, removeMovement};
};
