import * as http from "http";
import { checkAuthAndUser } from "../../bundles/person/user.factory";
import { badRequest, internalError } from "../../bundles/default-responses/default-responses";
import { correctLoginResponse } from "./login.response.factory";
import { ApiLoginPostReqBody } from "../../bundles/body-validation/api-classes/api.login.POST.Req";
import { LoginBodyPostReq } from "./login.model";
import { getBodyFromReq } from "../../bundles/body-validation/body-validation.fasade";

export const loginController = async (method: string, res: http.ServerResponse, data: string) => {
  const accepted_methods = ["POST"];
  const body = await getBodyFromReq<ApiLoginPostReqBody<LoginBodyPostReq>, LoginBodyPostReq>(
    ApiLoginPostReqBody,
    method,
    accepted_methods,
    data
  );
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
