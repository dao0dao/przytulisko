import { validate } from "class-validator";
import { ParsedBody } from "../../api/api-body.model";

export class Validator<BodyType> {
  constructor(data: ParsedBody) {
    this.data = data;
  }
  private data: ParsedBody;

  async getIsCorrectClass() {
    const class_keys = Object.keys(this).filter((key) => "data" !== key);
    for (const key in this.data) {
      if (!class_keys.includes(key)) {
        console.log("invalid keys");
        return false;
      }
      for (const class_key in this) {
        if (class_key === key) {
          this[class_key] = this.data[key] as this[Extract<keyof this, string>];
        }
      }
    }
    const errors = await validate(this);
    if (errors.length) {
      console.log("invalid values");
      return false;
    }
    return this.data as BodyType;
  }
}
