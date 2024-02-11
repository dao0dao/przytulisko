import * as http from "http";
import { correctRegisterResponse } from "./register.response.factory";
import { badRequest, internalError } from "../../bundles/default-responses/default-responses";
import { ApiRegisterPostReqBody } from "../../bundles/body-validation/api-classes/api.register.POST.Req";
import { RegisterBodyPostReq } from "./register.model";
import { checkCanRegisterUser, createUser } from "../../bundles/person/user.factory";
import { getBodyFromReq } from "../../bundles/body-validation/body-validation.fasade";

export const registerController = async (method: string, res: http.ServerResponse, data: string) => {
  const accepted_methods = ["POST"];
  const body = await getBodyFromReq<ApiRegisterPostReqBody<RegisterBodyPostReq>, RegisterBodyPostReq>(
    ApiRegisterPostReqBody,
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
  const person = await checkCanRegisterUser(body);
  if (!person) {
    console.log("user or admin not exist");
    return badRequest(res);
  }
  const is_user = await createUser(body);
  if (!is_user) {
    return internalError(res);
  }
  correctRegisterResponse(res);
};
