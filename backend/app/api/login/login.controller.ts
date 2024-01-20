import * as http from "http";
import { checkAuthAndUser } from "../../bundles/authorization/authorization.user.factory";
import { badRequest } from "../../bundles/default-responses/default-responses";
import { correctLoginResponse } from "./login.response.factory";
import { validateBody } from "../../bundles/authorization/login.body.factory";
import { MainValidatorBody } from "../../bundles/class-validator/main-class-validator";

export const authorizationController = async (url: string, method: string, res: http.ServerResponse, data: string) => {
  let parsedBody: MainValidatorBody;
  if (!data) {
    return badRequest(res);
  }
  try {
    parsedBody = JSON.parse(data);
  } catch (error) {
    return badRequest(res);
  }
  const is_correct_body = await validateBody<{ email: string; password: string }>(parsedBody);
  if (!is_correct_body) {
    return badRequest(res);
  }
  const user = await checkAuthAndUser(is_correct_body);
  if (!user) {
    return badRequest(res);
  }
  correctLoginResponse(res, user);
};
