import { QueryError } from "mysql2";
import { RegisterBodyPostReq } from "../../api/register/register.model";
import { pool } from "../../shared/db-pool";
import { sqlQuery } from "../../shared/sql-query";
import { SALT_ROUNDS } from "../../shared/varaibles";
import { User, Admin, Person } from "./authorization.model";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const getPerson = async (email: string) => {//to do: poprawić kod by TS zwracał PERSON[]
  const users = new Promise<Person[] | false>((resolve) => {
    const queryAdmin = sqlQuery`SELECT * FROM przytulisko.admin WHERE login=${email};`;
    pool.query(queryAdmin, (err: QueryError | null, result: User[]) => {
      //Dokładnie ten if trzeba poprawić
      if (err || !result.length) {
        const queryUsers = sqlQuery`SELECT * FROM przytulisko.users WHERE login=${email};`;
        pool.query(queryUsers, (err, result) => {
          if (err) {
            resolve(false);
          } else {
            resolve(result as Admin[]);
          }
        });
      } else {
        resolve(result as User[]);
      }
    });
  });
  const result = await users;
  if (!result || 1 !== result.length) {
    return false;
  }
  return result[0];
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
