import { ResultSetHeader } from "mysql2";
import { pool } from "../../shared/db-pool";
import { sqlQuery } from "../../shared/sql-query";
import { SALT_ROUNDS } from "../../shared/varaibles";
import { Person } from "./person.model";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { RemindPasswordBodyPostReq } from "../../api/remind-password/remind-password.model";
import { createExpiresSqlDate, createSqlDate } from "../../shared/sql-date";
import { ResetPasswordBodyPostReq } from "../../api/reset-passowrd/reset-password.model";
import { changeAdminPasswordById, getAdminByEmail, getAdminById, getAdminByResetToken } from "./admin.factory";
import { changeUserPasswordById, getUserByEmail, getUserById, getUserByResetToken } from "./user.factory";

export const getPersonByEmail = async (email: string): Promise<false | Person | null> => {
  const admin = await getAdminByEmail(email);
  const user = await getUserByEmail(email);
  if (!admin && !user) {
    return false;
  }
  if (!admin && user) {
    user.type = "user";
    return user;
  }
  if (admin && !user) {
    admin.type = "admin";
    return admin;
  }
  if (admin && user) {
    return null;
  }
  return null;
};
export const getPersonById = async (id: string): Promise<false | Person | null> => {
  const admin = await getAdminById(id);
  const user = await getUserById(id);
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

export const setPersonTokenToUser = async (body: RemindPasswordBodyPostReq) => {
  const person = await getPersonByEmail(body.email);
  if (!person) {
    return null;
  }
  const uuid = uuidv4();
  const expire_date = createExpiresSqlDate();
  const result = new Promise<false | string>((resolve) => {
    let query = "";
    if ("super_admin" in person) {
      query = sqlQuery`UPDATE przytulisko.admin SET reset_token=${uuid}, reset_token_expired_date=${expire_date} WHERE id=${person.id};`;
    } else {
      query = sqlQuery`UPDATE przytulisko.users SET reset_token=${uuid}, reset_token_expired_date=${expire_date} WHERE id=${person.id};`;
    }
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
  console.log(person);
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
