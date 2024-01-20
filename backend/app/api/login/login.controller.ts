import * as http from "http";
import { checkAuthAndUser } from "../../bundles/authorization/authorization.user.factory";
import { badRequest } from "../../bundles/default-responses/default-responses";
import { correctLoginResponse } from "./login.response.factory";

export const authorizationController = async (url: string, method: string, res: http.ServerResponse, data: string) => {
  let parsedBody;
  if (!data) {
    return badRequest(res);
  }
  try {
    parsedBody = JSON.parse(data);
  } catch (error) {
    return badRequest(res);
  }

  const user = await checkAuthAndUser(parsedBody);
  if (!user) {
    return badRequest(res);
  }
  correctLoginResponse(res, user);
};
