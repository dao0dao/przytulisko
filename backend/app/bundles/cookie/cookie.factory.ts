import * as http from "http";
import { COOKIE_NAME, SALT_ROUNDS } from "../../shared/varaibles";
import { Person } from "../person/person.model";
import * as bcrypt from "bcrypt";
import { sqlQuery } from "../../shared/sql-query";
import { pool } from "../../shared/db-pool";
import { createExpiresSqlDate } from "../../shared/sql-date";

export const createNewCookie = async (res: http.ServerResponse, user: Person) => {
  const secret_one = "Chrząszcz";
  const secret_two = "Trzcinie";
  const data = secret_one + user.login + secret_two;
  let cookie_key = await bcrypt.hash(data, SALT_ROUNDS);
  cookie_key = cookie_key.replace(/\$*\/*\.*/g, "");
  const expires = createExpiresSqlDate();
  const cookie = `${COOKIE_NAME}=${cookie_key}; Max-Age=${expires}; Secure; HttpOnly; SameSite=Strict; path=/`;
  const result = new Promise<boolean>((resolve) => {
    const query = sqlQuery`INSERT INTO przytulisko.session (cookie_key, user_id, expires) VALUES (${cookie_key}, ${user.id}, ${expires});`;
    pool.query(query, (err) => {
      if (err) {
        return resolve(false);
      } else {
        resolve(true);
      }
    });
  });
  if (!(await result)) {
    return false;
  }
  res.setHeader("Set-Cookie", cookie);
  return true;
};

export const removeCookie = (res: http.ServerResponse) => {
  const cookie = `${COOKIE_NAME}=''; Max-Age=0 Secure; HttpOnly; SameSite=Strict; path=/`;
  res.setHeader("Set-Cookie", cookie);
  return true;
};
