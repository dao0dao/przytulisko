import * as http from "http";
import { badRequest, internalError } from "../../bundles/default-responses/default-responses";
import { checkIsPersonLogIn } from "../../bundles/session/session.fasade";
import { Person, Admin } from "../../bundles/person/person.model";

const checIsAdminType = (t: Person): t is Admin => {
  return "super_admin" in t;
};

export const sessionController = async (method: string, req: http.IncomingMessage, res: http.ServerResponse) => {
  const accepted_methods = ["GET"];
  if (!accepted_methods.includes(method)) {
    badRequest(res);
    return;
  }
  const person_login = await checkIsPersonLogIn(req);
  if (person_login) {
    let responseData = { isLogin: true, login: person_login.login, type: person_login.type };
    if (checIsAdminType(person_login)) {
      responseData = Object.assign(responseData, { isSuperAdmin: !!person_login.super_admin });
    }
    res.end(JSON.stringify(responseData));
  } else if (null === person_login) {
    internalError(res);
  } else {
    const responseData = { isLogin: false };
    res.end(JSON.stringify(responseData));
  }
};
