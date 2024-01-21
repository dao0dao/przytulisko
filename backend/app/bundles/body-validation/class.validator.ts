import { ParsedBody } from "../../api/api-body.model";
import { MainValidator } from "./main-class-validator";

export const validateBody = async <ClassType extends MainValidator<BodyType>, BodyType>(
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
