import { initialBodyValidation } from "./initial-body-validation";
import { Validator } from "./class-validator";
import { validateBody } from "./body-validator";
import { ParsedBody } from "../../api/api-body.model";

export const getBodyFromReq = async <ClassType extends Validator<BodyType>, BodyType>(
  class_type: new (data: ParsedBody) => ClassType,
  current_method: string,
  accepted_method: string | string[],
  data: string
) => {
  const parsed_body = initialBodyValidation(current_method, accepted_method, data);
  if (!parsed_body) {
    return false;
  }
  const body = await validateBody<ClassType, BodyType>(class_type, parsed_body);
  return body
};
