import { QueryError, ResultSetHeader } from "mysql2";
import { pool } from "../../shared/db-pool";
import { sqlQuery } from "../../shared/sql-query";
import { Admin } from "./person.model";

export const getAdminByEmail = async (email: string) => {
  const admin = new Promise<Admin[] | false>((resolve) => {
    const queryAdmin = sqlQuery`SELECT * FROM przytulisko.admin WHERE login=${email} LIMIT 1;`;
    pool.query(queryAdmin, (err: QueryError, result: Admin[]) => {
      if (err) {
        resolve(false);
      } else {
        resolve(result);
      }
    });
  });
  const result = await admin;
  if (!result || 1 !== result.length) {
    return false;
  }
  return result[0];
};

export const getAdminByResetToken = async (reset_token: string, date_now: string) => {
  const admin = new Promise<Admin[] | false>((resolve) => {
    console.log(reset_token);
    const queryAdmin = sqlQuery`SELECT * FROM przytulisko.admin WHERE reset_token=${reset_token} AND reset_token_expired_date > ${date_now} LIMIT 1;`;
    pool.query(queryAdmin, (err: QueryError, result: Admin[]) => {
      if (err) {
        resolve(false);
      } else {
        resolve(result);
      }
    });
  });
  const result = await admin;
  if (!result || 1 !== result.length) {
    return false;
  }
  return result[0];
};
export const changeAdminPasswordById = async (id: string, hashed_password: string) => {
  const result = new Promise<true | null>((resolve) => {
    const query = sqlQuery`UPDATE przytulisko.admin SET password=${hashed_password}, reset_token=NULL, reset_token_expired_date=NULL WHERE id=${id};`;
    pool.query(query, (err, result: ResultSetHeader) => {
      if (err || 1 !== result.affectedRows) {
        resolve(null);
        return;
      }
      resolve(true);
    });
  });
  return result;
};

export const getAdminById = async (id: string) => {
    const admin = new Promise<Admin[] | false>((resolve) => {
      const queryAdmin = sqlQuery`SELECT * FROM przytulisko.admin WHERE id=${id} LIMIT 1;`;
      pool.query(queryAdmin, (err: QueryError, result: Admin[]) => {
        if (err) {
          resolve(false);
        } else {
          resolve(result);
        }
      });
    });
    const result = await admin;
    if (!result || 1 !== result.length) {
      return false;
    }
    return result[0];
  };