import { ParsedBody } from "../../api/api-body.model";

export const initialBodyValidation = (current_method: string, accepted_method: string | string[], data: string) => {
  if (!accepted_method.includes(current_method)) {
    return false;
  }
  let parsedBody: ParsedBody;
  if (!data) {
    return false;
  }
  try {
    parsedBody = JSON.parse(data);
  } catch (error) {
    return false;
  }
  return parsedBody;
};
