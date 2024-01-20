import { IsString } from "class-validator";
import { MainValidator, MainValidatorBody } from "../main-class-validator";

export class ApiLoginPostReqBody extends MainValidator {
  constructor(body: MainValidatorBody) {
    super();
    this.validateClassKeys(body);
  }

  @IsString()
  email: string = "";

  @IsString()
  password: string = "";
}
