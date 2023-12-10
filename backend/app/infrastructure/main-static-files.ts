import * as http from "http";
import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { getFileNameFromUrl } from "./get-file-name";
import { APP_FRONT_STATIC_DIRECTORY } from "../shared/file-directory";
import { notFound } from "../shared/default-responses";

export const sendStaticFile = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { url } = req;
  const file = getFileNameFromUrl(url);
  let filePath = "";

  if ("" === file) {
    filePath = path.join(APP_FRONT_STATIC_DIRECTORY, "index.html");
  } else {
    filePath = path.join(APP_FRONT_STATIC_DIRECTORY, file);
  }
  const extName = path.extname(file);
  let contentType = "";
  switch (extName) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".ico":
      contentType = "image/x-icon";
      break;
    case ".txt":
      contentType = "text/plain";
      break;
    default:
      contentType = "text/html";
  }
  readFile(filePath)
    .then((content) => {
      res.statusCode = 200;
      res.setHeader("Content-type", contentType);
      res.end(content, "utf-8");
    })
    .catch((err) => {
      if (err) {
        return notFound(res);
      }
    });
};
