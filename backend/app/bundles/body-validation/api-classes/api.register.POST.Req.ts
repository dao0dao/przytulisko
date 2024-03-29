import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Validator } from "../class-validator";
import { ParsedBody } from "../../../api/api-body.model";

export class ApiRegisterPostReqBody<BodyType> extends Validator<BodyType> {
  constructor(body: ParsedBody) {
    super(body);
  }

  @IsNotEmpty()
  @IsString()
  email: string = "";
  
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  password: string = "";
  
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  passwordConfirm: string = "";
}
