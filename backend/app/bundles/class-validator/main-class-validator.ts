export type MainValidatorBody = { [key: string]: never };

export class MainValidator {
  validateClassKeys(body: MainValidatorBody) {
    const class_keys = Object.keys(this).filter((key) => "is_correct_class" !== key);
    console.log(class_keys);
    for (const key in body) {
      if (!class_keys.includes(key)) {
        this.is_correct_class = false;
      }
      for (const class_key in this) {
        if (class_key === key) {
          this[class_key] = body[key];
        }
      }
    }
  }

  private is_correct_class: boolean = true;
  getIsCorrectClass() {
    return this.is_correct_class;
  }
}
