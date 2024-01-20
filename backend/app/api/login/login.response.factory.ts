import * as http from "http";
import { User } from "../../bundles/authorization/authorization.model";
import { createNewCookie } from "../../bundles/cookie/cookie.factory";
import { internalError } from "../../bundles/default-responses/default-responses";

export const correctLoginResponse = async (res: http.ServerResponse, user: User) => {
  const data = { loginStatus: true };
  res.statusCode = 200;
  const cookies = await createNewCookie(res, user);
  if (!cookies) {
    return internalError(res);
  }
  res.setHeader("Content-type", "application/json");
  res.end(JSON.stringify(data));
};
