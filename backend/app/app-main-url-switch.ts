import * as http from "http";

export const appMainUrlSwitch = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { url } = req;
  switch (url) {
    case "/api":
      res.statusCode = 200;
      return res.end("Witaj, świecie!");
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      return res.end("Not found");
  }
};
