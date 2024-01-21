import * as http from "http";
import { checkAuthAndUser } from "../../bundles/authorization/authorization.user.factory";
import { badRequest, internalError } from "../../bundles/default-responses/default-responses";
import { correctLoginResponse } from "./login.response.factory";
import { ApiLoginPostReqBody } from "../../bundles/body-validation/api-classes/api.login.POST.Req";
import { validateBody } from "../../bundles/body-validation/class.validator";
import { ParsedBody } from "../api-body.model";
import { LoginBodyPostReq } from "./login.model";


export const authorizationController = async (url: string, method: string, res: http.ServerResponse, data: string) => {
  let parsedBody: ParsedBody;
  if (!data) {
    return badRequest(res);
  }
  try {
    parsedBody = JSON.parse(data);
  } catch (error) {
    return badRequest(res);
  }
  const is_correct_body = await validateBody<ApiLoginPostReqBody<LoginBodyPostReq>, LoginBodyPostReq>(ApiLoginPostReqBody, parsedBody);
  if (false === is_correct_body) {
    return badRequest(res);
  }
  if (null === is_correct_body) {
    return internalError(res);
  }
  const user = await checkAuthAndUser(is_correct_body);
  if (!user) {
    return badRequest(res);
  }
  correctLoginResponse(res, user);
};
