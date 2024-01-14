export function sqlQuery(strings: TemplateStringsArray, ...values: string[]) {
  return values.reduce((accumulator, current_value, index) => {
    return `${accumulator}"${current_value}"${strings[index + 1]}`;
  }, strings[0]);
}
