import * as http from "http";

export const correctRegisterResponse = async (res: http.ServerResponse) => {
  const data = { registerStatus: true };
  res.statusCode = 200;
  res.setHeader("Content-type", "application/json");
  res.end(JSON.stringify(data));
};
