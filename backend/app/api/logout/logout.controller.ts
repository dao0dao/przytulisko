import * as http from "http";
import { badRequest } from "../../bundles/default-responses/default-responses";
import { removeCookie } from "../../bundles/cookie/cookie.factory";
import { removeSession } from "../../bundles/session/session.fasade";

export const logoutController = async (method: string, req: http.IncomingMessage, res: http.ServerResponse) => {
  const accepted_methods = ["GET"];
  if (!accepted_methods.includes(method)) {
    return badRequest(res);
  }
  const is_session_removed = await removeSession(req);
  if (!is_session_removed) {
    return badRequest(res);
  }
  const data = { isLogin: false, login: "" };
  removeCookie(res);
  res.setHeader("Content-type", "application/json");
  res.end(JSON.stringify(data));
};
 