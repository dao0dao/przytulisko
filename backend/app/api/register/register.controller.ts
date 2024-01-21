import * as http from "http";
import { correctRegisterResponse } from "./register.response.factory";
import { badRequest, internalError } from "../../bundles/default-responses/default-responses";
import { ParsedBody } from "../api-body.model";
import { validateBody } from "../../bundles/body-validation/body-validator";
import { ApiRegisterPostReqBody } from "../../bundles/body-validation/api-classes/api.register.POST.Req";
import { RegisterBodyPostReq } from "./register.model";
import { checkCanRegister } from "../../bundles/authorization/authorization.user.factory";
import { createUser } from "../../bundles/authorization/authorization.person.factory";

export const registerController = async (method: string, res: http.ServerResponse, data: string) => {
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
  const body = await validateBody<ApiRegisterPostReqBody<RegisterBodyPostReq>, RegisterBodyPostReq>(ApiRegisterPostReqBody, parsedBody);
  if (false === body) {
    return badRequest(res);
  }
  if (null === body) {
    return internalError(res);
  }
  const person = await checkCanRegister(body);
  if (!person) {
    console.log('user or admin exist')
    return badRequest(res);
  }
  const is_user = await createUser(body);
  if (!is_user) {
    return internalError(res);
  }
  correctRegisterResponse(res);
};
