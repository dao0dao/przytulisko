export const createExpiresSqlDate = () => {
  const now = new Date().getTime() + 3600 * 1000;
  const expireDate = new Date(now);
  const year = expireDate.getFullYear();
  let month = (expireDate.getMonth() + 1).toString();
  if (1 === month.length) {
    month = "0" + month;
  }
  let day = expireDate.getDate().toString();
  if (1 === day.length) {
    day = "0" + day;
  }
  let hours = expireDate.getHours().toString();
  if (1 === hours.length) {
    hours = "0" + hours;
  }
  let minutes = expireDate.getMinutes().toString();
  if (1 === minutes.length) {
    minutes = "0" + minutes;
  }
  let seconds = expireDate.getSeconds().toString();
  if (1 === seconds.length) {
    seconds = "0" + seconds;
  }
  const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return date;
};

export const createSqlDate = () => {
  const now = new Date().getTime();
  const expireDate = new Date(now);
  const year = expireDate.getFullYear();
  let month = (expireDate.getMonth() + 1).toString();
  if (1 === month.length) {
    month = "0" + month;
  }
  let day = expireDate.getDate().toString();
  if (1 === day.length) {
    day = "0" + day;
  }
  let hours = expireDate.getHours().toString();
  if (1 === hours.length) {
    hours = "0" + hours;
  }
  let minutes = expireDate.getMinutes().toString();
  if (1 === minutes.length) {
    minutes = "0" + minutes;
  }
  let seconds = expireDate.getSeconds().toString();
  if (1 === seconds.length) {
    seconds = "0" + seconds;
  }
  const date = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return date;
};
