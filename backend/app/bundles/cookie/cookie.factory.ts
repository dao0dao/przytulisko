import * as http from "http";
import { COOKIE_NAME, SALT_ROUNDS } from "../../shared/varaibles";
import { User } from "../authorization/authorization.model";
import * as bcrypt from "bcrypt";
import { sqlQuery } from "../../shared/sql-query";
import { pool } from "../../shared/db-pool";

const createExpiresSqlDate = () => {
  const now = new Date().getTime() + 3600 * 1000;
  const expireDate = new Date(now);
  const year = expireDate.getFullYear();
  let month = (expireDate.getMonth() + 1).toString();
  if (1 === month.length) {
    month = "0" + month;
  }
  let day = expireDate.getDate().toString();
  if (1 === day.length) {
    day = "0" + day;
  }
  let hours = expireDate.getHours().toString();
  if (1 === hours.length) {
    hours = "0" + hours;
  }
  let minutes = expireDate.getMinutes().toString();
  if (1 === minutes.length) {
    minutes = "0" + minutes;
  }
  let seconds = expireDate.getSeconds().toString();
  if (1 === seconds.length) {
    seconds = "0" + seconds;
  }
  const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return date;
};

export const createNewCookie = async (res: http.ServerResponse, user: User) => {
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
