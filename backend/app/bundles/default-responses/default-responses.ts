import * as http from "http";

export const notFound = (res: http.ServerResponse) => {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not found");
  return;
};

export const badRequest = (res: http.ServerResponse) => {
  res.statusCode = 400;
  res.setHeader("Content-Type", "text/plain");
  res.end("Bad request");
  return;
};

export const internalError = (res: http.ServerResponse) => {
  res.statusCode = 500;
  res.setHeader("Content-Type", "text/plain");
  res.end("Internal server error");
  return;
};
