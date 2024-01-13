import * as http from "http";
import { COOKIE_NAME, SALT_ROUNDS } from "../../shared/varaibles";
import { User } from "../authorization/authorization.model";
import * as bcrypt from "bcrypt";

export const createNewCookie = async (res: http.ServerResponse, user: User) => {
  const secret_one = "Chrząszcz";
  const secret_two = "Trzcinie";
  const data = secret_one + user.login + secret_two;
  let cookie_key = await bcrypt.hash(data, SALT_ROUNDS);
  cookie_key = cookie_key.replace(/\$*\/*\.*/g, "");
  const now = new Date();
  let expires: string | number | Date = now.getTime() + 3600 * 1000;
  expires = new Date(expires);
  expires = expires.toLocaleString().replace(",", "");
  const cookie = `${COOKIE_NAME}=${cookie_key}; Max-Age=${expires}; Secure; HttpOnly; SameSite=Strict; path=/`;
  res.setHeader("Set-Cookie", cookie);
};
