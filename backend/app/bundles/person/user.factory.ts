import * as bcrypt from "bcrypt";
import { getPersonByEmail } from "./person.factory";
import { LoginBodyPostReq } from "../../api/login/login.model";
import { RegisterBodyPostReq } from "../../api/register/register.model";
import { QueryError, ResultSetHeader } from "mysql2";
import { pool } from "../../shared/db-pool";
import { sqlQuery } from "../../shared/sql-query";
import { Person, User } from "./person.model";
import { v4 as uuidv4 } from "uuid";
import { SALT_ROUNDS } from "../../shared/varaibles";

export const checkAuthAndUser = async (body: LoginBodyPostReq): Promise<false | Person | null> => {
  const person = await getPersonByEmail(body.email);
  if (!person) {
    return person;
  }
  const is_correct_password = await bcrypt.compare(body.password, person.password);
  if (!is_correct_password) {
    return false;
  }
  return person;
};

export const checkCanRegisterUser = async (body: RegisterBodyPostReq) => {
  const { email, password, passwordConfirm } = body;
  if (password !== passwordConfirm) {
    return false;
  }
  // eslint-disable-next-line no-useless-escape
  const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email.match(emailRegExp)) {
    return false;
  }
  const person = await getPersonByEmail(email);
  if (person) {
    return false;
  }
  return true;
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
    const queryUsers = sqlQuery`SELECT * FROM przytulisko.users WHERE reset_token=${reset_token} AND reset_token_expired_date > ${date_now} LIMIT 1;`;
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

export const changeUserPasswordById = async (id: string, hashed_password: string) => {
  const result = new Promise<true | null>((resolve) => {
    const query = sqlQuery`UPDATE przytulisko.users SET password=${hashed_password}, reset_token=NULL, reset_token_expired_date=NULL WHERE id=${id};`;
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

export const createUser = async (body: RegisterBodyPostReq) => {
  const password = await bcrypt.hash(body.password, SALT_ROUNDS);
  const uuid = uuidv4();
  const result = new Promise<boolean>((resolve) => {
    const query = sqlQuery`INSERT INTO przytulisko.users (id, login, password) values (${uuid}, ${body.email}, ${password});`;
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

export const getUserById = async (id: string) => {
  const admin = new Promise<User[] | false>((resolve) => {
    const queryUsers = sqlQuery`SELECT * FROM przytulisko.users WHERE id=${id} LIMIT 1;`;
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
