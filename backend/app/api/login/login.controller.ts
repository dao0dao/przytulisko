import * as http from "http";
import { checkAuthAndUser } from "../../bundles/authorization/authorization.user.factory";
import { badRequest, internalError } from "../../bundles/default-responses/default-responses";
import { correctLoginResponse } from "./login.response.factory";
import { ApiLoginPostReqBody } from "../../bundles/body-validation/api-classes/api.login.POST.Req";
import { validateBody } from "../../bundles/body-validation/body-validator";
import { ParsedBody } from "../api-body.model";
import { LoginBodyPostReq } from "./login.model";

export const loginController = async (method: string, res: http.ServerResponse, data: string) => {
  if ("POST" !== method) {
    return badRequest(res);
  }
  let parsedBody: ParsedBody;
  if (!data) {
    return badRequest(res);
  }
  try {
    parsedBody = JSON.parse(data);
  } catch (error) {
    return badRequest(res);
  }
  const body = await validateBody<ApiLoginPostReqBody<LoginBodyPostReq>, LoginBodyPostReq>(ApiLoginPostReqBody, parsedBody);
  if (false === body) {
    return badRequest(res);
  }
  if (null === body) {
    return internalError(res);
  }
  const person = await checkAuthAndUser(body);
  if (!person) {
    return badRequest(res);
  }
  correctLoginResponse(res, person);
};
