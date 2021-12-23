import {useDatabase} from './useDatabase';

export const useMovements = ({accountId}, onSuccessRegistration) => {
  const {getDB, exQuery} = useDatabase();

  const registerMovement = async ({amount, payingUserId}) => {
    try {
      await exQuery(
        getDB(),
        `INSERT INTO "movement"
      ("payingUserId", "amount", "date", "accountId")
      VALUES (${payingUserId}, ${amount}, 'today', ${accountId});`,
      );

      const sum = await exQuery(
        getDB(),
        `SELECT u.id, SUM(m.amount) 'sum_amount' FROM user u JOIN movement m ON u.id = m.payingUserId WHERE m.accountId = ${accountId} GROUP BY u.id ORDER BY sum_amount ASC;`,
      );

      const absDiff = Math.abs(sum[0].sum_amount - sum[1].sum_amount);

      await exQuery(
        getDB(),
        `UPDATE "account" SET updatedDebt = ${absDiff} WHERE id = ${accountId};`,
      );
      onSuccessRegistration();
    } catch (e) {
      console.error(e);
    }
  };

  return {registerMovement};
};
