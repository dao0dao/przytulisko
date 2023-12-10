import * as http from "http";
import { notFound } from "./shared/default-responses";
import { sendStaticFile } from "./infrastructure/main-static-files";
import { isFile } from "./shared/check-is-file";

export const appMainController = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { url } = req;
  if (url?.includes("/api")) {
    res.statusCode = 200;
    res.end("Witaj, świecie!");
  } else if ("GET" === req.method && ("/" === url || isFile(url))) {
    sendStaticFile(req, res);
  } else {
    notFound(res);
  }
};
