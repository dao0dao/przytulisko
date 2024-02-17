import * as http from "http";
import { getSessionCookie, isPersonSessionExist, removeSessionByCookieKey } from "./session.factory";

export const checkIsPersonLogIn = async (req: http.IncomingMessage) => {
  const session_cookie = getSessionCookie(req);
  if (!session_cookie) {
    return false;
  }
  return isPersonSessionExist(session_cookie);
};

export const removeSession = async (req: http.IncomingMessage) => {
  const cookie_key = getSessionCookie(req);
  if (!cookie_key) {
    return false;
  }
  const is_session_removed = await removeSessionByCookieKey(cookie_key);
  if (!is_session_removed) {
    return false;
  }
  return true;
};
