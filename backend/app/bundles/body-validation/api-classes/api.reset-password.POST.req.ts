import { IsNotEmpty, IsString, IsUUID, MaxLength, MinLength } from "class-validator";
import { Validator } from "../class-validator";
import { ParsedBody } from "../../../api/api-body.model";

export class ApiResetPasswordPostReqBody<BodyType> extends Validator<BodyType> {
  constructor(body: ParsedBody) {
    super(body);
  }

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  password: string = "";
  
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(10)
  confirmPassword: string = "";

  @IsNotEmpty()
  @IsString()
  @IsUUID(4)
  hash: string = "";
}
