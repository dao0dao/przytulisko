import * as http from "http";
import { checkUserAuth } from "../../bundles/authorization/authorization.user.factory";
import { badRequest } from "../../shared/default-responses";
import { correctLoginResponse } from "./authorization.response.factory";

export const authorizationController = async (url: string, method: string, res: http.ServerResponse, body: any) => {
  let parsedBody;
  if (!body) {
    return badRequest(res);
  }
  try {
    parsedBody = JSON.parse(body);
  } catch (error) {
    return badRequest(res);
  }
  const is_correct_login = await checkUserAuth(parsedBody);
  if (!is_correct_login) {
    return badRequest(res);
  }
  correctLoginResponse(res);
};
