import * as http from "http";
import { notFound } from "./shared/default-responses";
import { fileController } from "./file-fasade/file-controller";
import { isFile } from "./shared/check-is-file";

export const appMainController = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { url } = req;
  console.log(url);
  if (url?.includes("/api/login")) {
    res.statusCode = 200;
    res.end("Witaj, świecie!");
  } else if ("GET" === req.method && ("/" === url || isFile(url))) {
    fileController(req, res);
  } else {
    notFound(res);
  }
};
