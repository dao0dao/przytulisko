import { IsString } from "class-validator";
import { MainValidator } from "../main-class-validator";
import { ParsedBody } from "../../../api/api-body.model";

export class ApiLoginPostReqBody<BodyType> extends MainValidator<BodyType> {
  constructor(body: ParsedBody) {
    super(body);
  }

  @IsString()
  email: string = "";

  @IsString()
  password: string = "";
}
