import * as http from "http";

import { initialBodyValidation } from "../../bundles/body-validation/initial-body-validation";
import { badRequest } from "../../bundles/default-responses/default-responses";
import { ApiRemindPasswordPostReqBody } from "../../bundles/body-validation/api-classes/api.remind-password.POST.req";
import { validateBody } from "../../bundles/body-validation/body-validator";
import { RemindPasswordBodyPostReq } from "./remind-password.model";

export const registerController = async (method: string, res: http.ServerResponse, data: string) => {
  const accepted_method = ["POST"];
  const parsed_body = initialBodyValidation(method, accepted_method, data);
  if (!parsed_body) {
    return badRequest(res);
  }
  const body = await validateBody<ApiRemindPasswordPostReqBody<RemindPasswordBodyPostReq>, RemindPasswordBodyPostReq>(
    ApiRemindPasswordPostReqBody,
    parsed_body
  );
  if (false === body) {
    return badRequest(res);
  }
  console.log(parsed_body);
};
