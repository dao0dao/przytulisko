import * as http from "http";
import { badRequest, internalError } from "../../bundles/default-responses/default-responses";
import { checkIsPersonLogIn } from "../../bundles/session/session.fasade";

export const sessionController = async (method: string, req: http.IncomingMessage, res: http.ServerResponse) => {
  const accepted_methods = ["GET"];
  if (!accepted_methods.includes(method)) {
    badRequest(res);
    return;
  }
  const person_login = await checkIsPersonLogIn(req);
  if (person_login) {
    const responseData = { isLogin: true, login: person_login };
    res.end(JSON.stringify(responseData));
  } else if (null === person_login) {
    internalError(res);
  } else {
    const responseData = { isLogin: false };
    res.end(JSON.stringify(responseData));
  }
};
