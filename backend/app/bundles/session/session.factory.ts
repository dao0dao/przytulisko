import * as http from "http";
import { COOKIE_NAME } from "../../shared/varaibles";
import { pool } from "../../shared/db-pool";
import { createSqlDate } from "../../shared/sql-date";
import { sqlQuery } from "../../shared/sql-query";
import { IdFromSession } from "./session.model";
import { QueryError } from "mysql2";
import { getPersonById } from "../person/person.factory";

export const getSessionCookie = (req: http.IncomingMessage) => {
  if (!req.headers.cookie) {
    return false;
  }
  const cookieArray = req.headers.cookie.split(";");
  if (0 === cookieArray.length) {
    return false;
  }
  const cookies: { [key: string]: string } = {};
  cookieArray.forEach((c) => {
    c = c.trim();
    const key = c.split("=")[0];
    const value = c.split("=")[1];
    cookies[key] = value;
  });
  if (!cookies[COOKIE_NAME!]) {
    return false;
  }
  return cookies[COOKIE_NAME!];
};

export const getPersonIdFromSession = (session_cookie: string) => {
  const now = createSqlDate();
  const query = sqlQuery`SELECT user_id from przytulisko.session WHERE cookie_key=${session_cookie} and expires > ${now}`;
  const person_id = new Promise<IdFromSession | false>((resolve) => {
    pool.query(query, (err: QueryError, result: IdFromSession[]) => {
      if (err || 0 === result.length) {
        resolve(false);
      } else {
        resolve(result[0]);
      }
    });
  });
  return person_id;
};

export const isPersonSessionExist = async (session_cookie: string) => {
  const person_id = await getPersonIdFromSession(session_cookie);
  if (!person_id) {
    return false;
  }
  const person = await getPersonById(person_id.user_id);
  if (!person) {
    return person;
  }
  return person.login;
};

export const removeSessionByCookieKey = (session_cookie: string) => {
  const query = sqlQuery`DELETE FROM przytulisko.session WHERE cookie_key=${session_cookie};`;
  const isRemovedSession = new Promise<boolean>((resolve) => {
    pool.query(query, (err) => {
      if (err) {
        resolve(false);
        return;
      }
      resolve(true);
    });
  });
  return isRemovedSession;
};
