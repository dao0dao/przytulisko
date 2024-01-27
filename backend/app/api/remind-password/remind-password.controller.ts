import * as http from "http";

import { badRequest, internalError } from "../../bundles/default-responses/default-responses";
import { ApiRemindPasswordPostReqBody } from "../../bundles/body-validation/api-classes/api.remind-password.POST.req";
import { RemindPasswordBodyPostReq } from "./remind-password.model";
import { getBodyFromReq } from "../../bundles/body-validation/body-validation.fasade";

export const registerController = async (method: string, res: http.ServerResponse, data: string) => {
  const accepted_method = ["POST"];
  const body = await getBodyFromReq<ApiRemindPasswordPostReqBody<RemindPasswordBodyPostReq>, RemindPasswordBodyPostReq>(
    ApiRemindPasswordPostReqBody,
    method,
    accepted_method,
    data
  );
  if (false === body) {
    return badRequest(res);
  }
  if (null === body) {
    return internalError(res);
  }
  console.log(body);
};
