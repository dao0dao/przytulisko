import { IsString } from "class-validator";
import { MainValidator, MainValidatorBody } from "../main.validator";

export class ApiLoginPostReqBody extends MainValidator {
  constructor(body: MainValidatorBody) {
    super(body);
  }

  @IsString()
  email: string = "";

  @IsString()
  password: string = "";
}
