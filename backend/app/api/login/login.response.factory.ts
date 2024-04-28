import * as http from "http";
import { Admin, Person } from "../../bundles/person/person.model";
import { createNewCookie } from "../../bundles/cookie/cookie.factory";
import { internalError } from "../../bundles/default-responses/default-responses";

const checIsAdminType = (t: Person): t is Admin => {
  return "super_admin" in t;
};

export const correctLoginResponse = async (res: http.ServerResponse, person: Person) => {
  let data = { isLogin: true, login: person.login, type: person.type };
  if (checIsAdminType(person)) {
    data = Object.assign(data, { isSuperAdmin: !!person.super_admin });
  }
  res.statusCode = 200;
  const cookies = await createNewCookie(res, person);
  if (!cookies) {
    return internalError(res);
  }
  res.setHeader("Content-type", "application/json");
  res.end(JSON.stringify(data));
};
