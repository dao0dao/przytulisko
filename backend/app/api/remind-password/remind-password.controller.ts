import * as http from "http";

import { initialBodyValidation } from "../../bundles/body-validation/initial-body-validation";
import { badRequest } from "../../bundles/default-responses/default-responses";

export const registerController = async (method: string, res: http.ServerResponse, data: string) => {
  const accepted_method = ["POST"];
  const parsed_body = initialBodyValidation(method, accepted_method, data);
  if (!parsed_body) {
    return badRequest(res);
  }
  console.log(parsed_body);
};
