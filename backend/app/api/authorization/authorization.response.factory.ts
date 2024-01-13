import * as http from "http";
import { User } from "../../bundles/authorization/authorization.model";
import { createNewCookie } from "../../bundles/cookie/cookie.factory";

export const correctLoginResponse = async (res: http.ServerResponse, user: User) => {
  const data = { loginStatus: true };
  res.statusCode = 200;
  await createNewCookie(res, user);
  res.setHeader("Content-type", "application/json");
  res.end(JSON.stringify(data)); 
};
