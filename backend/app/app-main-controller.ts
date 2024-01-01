import * as http from "http";
import { notFound } from "./shared/default-responses";
import { fileController } from "./file-fasade/file-controller";
import { isFile } from "./shared/check-is-file";
import { apiSwitchUrl } from "./api/api-switch-controller";

export const appMainController = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { url } = req;
  if (url?.includes("/api")) {
    apiSwitchUrl(req, res);
  } else if ("GET" === req.method && ("/" === url || isFile(url))) {
    fileController(req, res);
  } else {
    notFound(res);
  }
};
