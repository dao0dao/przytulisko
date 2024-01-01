import * as http from "http";

export const authorizationController = (url: string, res: http.ServerResponse, body?: unknown) => {
  console.log(body);
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");
  res.end("Witaj, świecie!");
};
