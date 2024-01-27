import * as http from "http";
import { checkAuthAndUser } from "../../bundles/authorization/authorization.user.factory";
import { badRequest, internalError } from "../../bundles/default-responses/default-responses";
import { correctLoginResponse } from "./login.response.factory";
import { ApiLoginPostReqBody } from "../../bundles/body-validation/api-classes/api.login.POST.Req";
import { validateBody } from "../../bundles/body-validation/body-validator";
import { LoginBodyPostReq } from "./login.model";
import { initialBodyValidation } from "../../bundles/body-validation/initial-body-validation";

export const loginController = async (method: string, res: http.ServerResponse, data: string) => {
  const accepted_method = ["POST"];
  const parsed_body = initialBodyValidation(method, accepted_method, data);
  if (!parsed_body) {
    return badRequest(res);
  }
  const body = await validateBody<ApiLoginPostReqBody<LoginBodyPostReq>, LoginBodyPostReq>(ApiLoginPostReqBody, parsed_body);
  if (false === body) {
    return badRequest(res);
  }
  if (null === body) {
    return internalError(res);
  }
  const person = await checkAuthAndUser(body);
  if (false === person) {
    return badRequest(res);
  }
  if (null === person) {
    return internalError(res);
  }
  correctLoginResponse(res, person);
};
