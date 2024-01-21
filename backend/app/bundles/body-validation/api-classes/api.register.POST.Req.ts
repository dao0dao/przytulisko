import { IsString } from "class-validator";
import { Validator } from "../class-validator";
import { ParsedBody } from "../../../api/api-body.model";

export class ApiRegisterPostReqBody<BodyType> extends Validator<BodyType> {
  constructor(body: ParsedBody) {
    super(body);
  }

  @IsString()
  email: string = "";

  @IsString()
  password: string = "";

  @IsString()
  passwordConfirm: string = "";
}
