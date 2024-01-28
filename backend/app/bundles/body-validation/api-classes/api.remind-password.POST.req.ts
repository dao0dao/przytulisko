import { IsNotEmpty, IsString } from "class-validator";
import { Validator } from "../class-validator";
import { ParsedBody } from "../../../api/api-body.model";

export class ApiRemindPasswordPostReqBody<BodyType> extends Validator<BodyType> {
  constructor(body: ParsedBody) {
    super(body);
  }

  @IsNotEmpty()
  @IsString()
  email: string = "";
}
