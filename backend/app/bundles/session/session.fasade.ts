import * as http from "http";
import { getSessionCookie, isPersonSessionExist } from "./session.factory";

export const checkIsPersonLogIn = async (req: http.IncomingMessage) => {
  const session_cookie = getSessionCookie(req);
  if (!session_cookie) {
    return false;
  }
  return isPersonSessionExist(session_cookie);
};
