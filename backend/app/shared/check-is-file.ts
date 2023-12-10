export const isFile = (string?: string) => {
  if (!string) {
    return false;
  }
  const regex = /\.[a-zA-Z]{2,4}/;
  return regex.test(string);
};
