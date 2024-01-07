import * as crypt from "bcrypt";
import { pool } from "../../shared/db-pool";
import { User } from "./authorization.model";

function sql(strings: TemplateStringsArray, ...values: [string]) {
  return values.reduce((final_string, value, index) => {
    return `${final_string}"${value}"${strings[index + 1]}`;
  }, strings[0]);
}

const checkIsUserExist = async (email: string) => {
  const users = new Promise<User[] | false>((resolve) => {
    const query = sql`SELECT * FROM przytulisko.admin WHERE login=${email} LIMIT 1;`;
    pool.query(query, (err, result) => {
      if (err) {
        resolve(false);
      } else {
        resolve(result as User[]);
      }
    });
  });
  const result = await users;
  if (!result || 0 === result.length) {
    return false;
  }
  return result[0];
};

export const checkUserAuth = async (body: { email: string; password: string }) => {
  const user = await checkIsUserExist(body.email);
  if (!user) {
    return false;
  }
  const is_correct_password = await crypt.compare(body.password, user.password);
  if (!is_correct_password) {
    return false;
  }
  return true;
};
