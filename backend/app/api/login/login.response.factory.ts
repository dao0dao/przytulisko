import * as http from "http";
import { Person } from "../../bundles/person/person.model";
import { createNewCookie } from "../../bundles/cookie/cookie.factory";
import { internalError } from "../../bundles/default-responses/default-responses";

export const correctLoginResponse = async (res: http.ServerResponse, person: Person) => {
  const data = { isLogin: true, login: person.login };
  res.statusCode = 200;
  const cookies = await createNewCookie(res, person);
  if (!cookies) {
    return internalError(res);
  }
  res.setHeader("Content-type", "application/json");
  res.end(JSON.stringify(data));
};
