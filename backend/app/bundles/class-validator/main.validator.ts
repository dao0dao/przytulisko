export type MainValidatorBody = { [key: string]: never };

export class MainValidator {
  constructor(body: MainValidatorBody) {
    const classKeys = Object.keys(this).filter((key) => "isCorrectClass" !== key && "getIsCorrectClass" !== key);
    for (const key in body) {
      if (!classKeys.includes(key)) {
        this.isCorrectClass = false;
      }
      for (const classKey in this) {
        if (classKey === key) {
          this[classKey] = body[key];
        }
      }
    }
  }

  private isCorrectClass: boolean = true;
  getIsCorrectClass() {
    return this.isCorrectClass;
  }
}
