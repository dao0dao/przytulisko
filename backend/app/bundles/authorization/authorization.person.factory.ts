import { QueryError, ResultSetHeader } from "mysql2";
import { RegisterBodyPostReq } from "../../api/register/register.model";
import { pool } from "../../shared/db-pool";
import { sqlQuery } from "../../shared/sql-query";
import { SALT_ROUNDS } from "../../shared/varaibles";
import { User, Admin, Person } from "./authorization.model";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { RemindPasswordBodyPostReq } from "../../api/remind-password/remind-password.model";
import { createExpiresSqlDate, createSqlDate } from "../../shared/sql-date";
import { ResetPasswordBodyPostReq } from "../../api/reset-passowrd/reset-password.model";

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
    const queryAdmin = sqlQuery`SELECT * FROM przytulisko.admin WHERE reset_token=${reset_token} IS NOT NULL AND reset_token_expired_date > ${date_now} LIMIT 1;`;
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

export const getUserByEmail = async (email: string) => {
  const admin = new Promise<User[] | false>((resolve) => {
    const queryUsers = sqlQuery`SELECT * FROM przytulisko.users WHERE login=${email} LIMIT 1;`;
    pool.query(queryUsers, (err: QueryError, result: User[]) => {
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
export const getUserByResetToken = async (reset_token: string, date_now: string) => {
  const admin = new Promise<User[] | false>((resolve) => {
    const queryUsers = sqlQuery`SELECT * FROM przytulisko.users WHERE reset_token=${reset_token}IS NOT NULL AND reset_token_expired_date > ${date_now} LIMIT 1;`;
    pool.query(queryUsers, (err: QueryError, result: User[]) => {
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
    const query = `UPDATE przytulisko.admin SET password=${hashed_password} WHERE id=${id}`;
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
export const changeUserPasswordById = async (id: string, hashed_password: string) => {
  const result = new Promise<true | null>((resolve) => {
    const query = `UPDATE przytulisko.users SET password=${hashed_password} WHERE id=${id}`;
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

export const getPerson = async (email: string): Promise<false | Person | null> => {
  const admin = await getAdminByEmail(email);
  const user = await getUserByEmail(email);
  if (!admin && !user) {
    return false;
  }
  if (!admin && user) {
    return user;
  }
  if (admin && !user) {
    return admin;
  }
  if (admin && user) {
    return null;
  }
  return null;
};
export const getPersonByResetToken = async (reset_token: string): Promise<false | Person | null> => {
  const now = createSqlDate();
  const admin = await getAdminByResetToken(reset_token, now);
  const user = await getUserByResetToken(reset_token, now);
  if (!admin && !user) {
    return false;
  }
  if (!admin && user) {
    return user;
  }
  if (admin && !user) {
    return admin;
  }
  if (admin && user) {
    return null;
  }
  return null;
};

export const createUser = async (body: RegisterBodyPostReq) => {
  const password = await bcrypt.hash(body.password, SALT_ROUNDS);
  const uuid = uuidv4();
  const result = new Promise<boolean>((resolve) => {
    const query = sqlQuery`INSERT INTO przytulisko.users (id, login, password) values (${uuid}, ${body.email}, ${password})`;
    pool.query(query, (err) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
  return result;
};

export const setResetTokenToUser = (body: RemindPasswordBodyPostReq) => {
  const uuid = uuidv4();
  const expire_date = createExpiresSqlDate();
  const result = new Promise<false | string>((resolve) => {
    const query = sqlQuery`UPDATE przytulisko.users SET reset_token=${uuid}, reset_token_expired_date=${expire_date} WHERE login=${body.email}`;
    pool.query(query, (err, result: ResultSetHeader) => {
      if (err || 0 === result.affectedRows) {
        resolve(false);
      } else {
        resolve(uuid);
      }
    });
  });
  return result;
};

export const resetPersonPassword = async (body: ResetPasswordBodyPostReq) => {
  const { password, confirmPassword, hash } = body;
  if (password !== confirmPassword) {
    return null;
  }
  const person = await getPersonByResetToken(hash);
  if (!person) {
    return person;
  }
  const hashed_password = await bcrypt.hash(body.password, SALT_ROUNDS);
  if ("super_admin" in person) {
    const result = await changeAdminPasswordById(person.id, hashed_password);
    return result;
  } else {
    const result = await changeUserPasswordById(person.id, hashed_password);
    return result;
  }
};
