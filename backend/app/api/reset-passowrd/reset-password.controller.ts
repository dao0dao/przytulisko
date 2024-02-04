import * as http from "http";

import { badRequest, internalError } from "../../bundles/default-responses/default-responses";
import { getBodyFromReq } from "../../bundles/body-validation/body-validation.fasade";
import { ResetPasswordBodyPostReq } from "./reset-password.model";
import { ApiResetPasswordPostReqBody } from "../../bundles/body-validation/api-classes/api.reset-password.POST.req";
import { resetPersonPassword } from "../../bundles/authorization/authorization.person.factory";

export const resetPasswordController = async (method: string, res: http.ServerResponse, data: string) => {
  const accepted_methods = ["POST"];
  const body = await getBodyFromReq<ApiResetPasswordPostReqBody<ResetPasswordBodyPostReq>, ResetPasswordBodyPostReq>(
    ApiResetPasswordPostReqBody,
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
  const result = await resetPersonPassword(body);

  if (null === result) {
    return internalError(res);
  }
  if (false === result) {
    return badRequest(res);
  }
  const responseData = { status: "updated" };
  res.end(JSON.stringify(responseData));
};
