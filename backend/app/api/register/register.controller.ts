import * as http from "http";
import { correctRegisterResponse } from "./register.response.factory";
import { badRequest, internalError } from "../../bundles/default-responses/default-responses";
import { validateBody } from "../../bundles/body-validation/body-validator";
import { ApiRegisterPostReqBody } from "../../bundles/body-validation/api-classes/api.register.POST.Req";
import { RegisterBodyPostReq } from "./register.model";
import { checkCanRegister } from "../../bundles/authorization/authorization.user.factory";
import { createUser } from "../../bundles/authorization/authorization.person.factory";
import { initialBodyValidation } from "../../bundles/body-validation/initial-body-validation";

export const registerController = async (method: string, res: http.ServerResponse, data: string) => {
  const accepted_method = ["POST"];
  const parsed_body = initialBodyValidation(method, accepted_method, data);
  if (!parsed_body) {
    return badRequest(res);
  }
  const body = await validateBody<ApiRegisterPostReqBody<RegisterBodyPostReq>, RegisterBodyPostReq>(ApiRegisterPostReqBody, parsed_body);
  if (false === body) {
    return badRequest(res);
  }
  if (null === body) {
    return internalError(res);
  }
  const person = await checkCanRegister(body);
  if (!person) {
    console.log("user or admin exist");
    return badRequest(res);
  }
  const is_user = await createUser(body);
  if (!is_user) {
    return internalError(res);
  }
  correctRegisterResponse(res);
};
