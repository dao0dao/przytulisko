import * as http from "http";
import { badRequest } from "../../bundles/default-responses/default-responses";
import { checkIsPersonLogIn } from "../../bundles/session/session.fasade";

export const sessionController = async (method: string, req: http.IncomingMessage, res: http.ServerResponse) => {
  const accepted_methods = ["GET"];
  if (!accepted_methods.includes(method)) {
    badRequest(res);
    return;
  }
  const is_person_login = await checkIsPersonLogIn(req);
  if (is_person_login) {
    const responseData = { isLogin: true };
    res.end(JSON.stringify(responseData));
  } else {
    const responseData = { isLogin: true };
    res.end(JSON.stringify(responseData));
  }
};
