import { createSqlDate } from "./shared/sql-date";
import { sqlQuery } from "./shared/sql-query";
import { pool } from "./shared/db-pool";

export const removeExpiredCookies = () => {
  const expireDate = createSqlDate();
  const sql = sqlQuery`delete from przytulisko.session where expires < ${expireDate}`;
  pool.query(sql, (err) => {
    if (err) {
      console.log("unable to remove cookies");
    } else {
      console.log("remove expired cookies");
    }
  });
};
