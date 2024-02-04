import * as http from "http";

import { badRequest, internalError } from "../../bundles/default-responses/default-responses";
import { ApiRemindPasswordPostReqBody } from "../../bundles/body-validation/api-classes/api.remind-password.POST.req";
import { RemindPasswordBodyPostReq } from "./remind-password.model";
import { getBodyFromReq } from "../../bundles/body-validation/body-validation.fasade";
import { setResetTokenToUser } from "../../bundles/authorization/authorization.person.factory";
import { correctRemindPasswordResponse } from "./remind-password.response.factory";

export const remindPasswordController = async (method: string, res: http.ServerResponse, data: string) => {
  const accepted_methods = ["POST"];
  const body = await getBodyFromReq<ApiRemindPasswordPostReqBody<RemindPasswordBodyPostReq>, RemindPasswordBodyPostReq>(
    ApiRemindPasswordPostReqBody,
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
  const result = await setResetTokenToUser(body);
  if (!result) {
    return badRequest(res);
  }
  correctRemindPasswordResponse(result, res);
};
