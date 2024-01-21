import { ParsedBody } from "../../api/api-body.model";
import { Validator } from "./class-validator";

export const validateBody = async <ClassType extends Validator<BodyType>, BodyType>(
  class_type: new (body: ParsedBody) => ClassType,
  body: ParsedBody
) => {
  const class_object = new class_type(body);
  if ("function" !== typeof class_object.getIsCorrectClass) {
    return null;
  }
  const result = await class_object.getIsCorrectClass();
  return result;
};
