import { validate } from "class-validator";
import { ApiLoginPostReqBody } from "../class-validator/api-validators/api.login.POST.Req";
import { MainValidatorBody } from "../class-validator/main-class-validator";

export const validateBody = async <T>(parsedBody: MainValidatorBody) => {
  const body = new ApiLoginPostReqBody(parsedBody);
  if (!body.getIsCorrectClass()) {
    return false;
  }
  const errors = await validate(body);
  if (errors.length) {
    return false;
  }
  return parsedBody as T;
};
