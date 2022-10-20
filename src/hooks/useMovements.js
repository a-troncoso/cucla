import {useDatabase} from './useDatabase';
import {useState} from 'react';

export const useMovements = () => {
  const {getDB, exQuery} = useDatabase();
  const [movements, setMovements] = useState([]);

  const registerMovement = async ({
    amount,
    payingUserId,
    debtUserId,
    accountId,
  }) => {
    try {
      await exQuery(
        getDB(),
        `INSERT INTO "movement"
        ("payingUserId", "debtUserId", "amount", "date", "accountId")
        VALUES
        (${payingUserId}, ${debtUserId}, ${amount}, 'today', ${accountId});`,
      );
    } catch (e) {
      console.error(e);
    }
  };

  const fetchMovements = async ({accountId}) => {
    try {
      const result = await exQuery(
        getDB(),
        `SELECT m.id,
                m.payingUserId,
                pu.name AS payingUserName,  pu.imagePath AS payingUserImagePath,
                m.debtUserId,
                du.name AS debtUserName, du.imagePath AS debtUserImagePath,
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

  const fetchMovementById = async movementId => {
    try {
      const result = await exQuery(
        getDB(),
        `SELECT m.payingUserId,
                m.debtUserId,
                m.date,
                m.amount
        FROM movement m
        WHERE
          m.id = ${movementId}
          AND m.active=1;`,
      );
      return result[0];
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
    } catch (e) {
      console.error(e);
    }
  };

  const editMovement = async ({movementId, amount}) => {
    const queryStatement = `UPDATE "movement" SET amount=${amount} WHERE id=${movementId};`;

    try {
      const res = await exQuery(getDB(), queryStatement);
      return res;
    } catch (e) {
      console.error(e);
    }
  };

  return {
    registerMovement,
    movements,
    fetchMovements,
    fetchMovementById,
    removeMovement,
    editMovement,
  };
};
