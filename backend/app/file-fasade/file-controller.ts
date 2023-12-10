import * as http from "http";
import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { getFileNameFromUrl } from "./get-file-name.factory";
import { notFound } from "../shared/default-responses";
import { getFile } from "./get-file.factory";
import { getFileContentType } from "./file-content-type.factory";

export const fileController = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { url } = req;
  const fileName = getFileNameFromUrl(url);
  const file = await getFile(fileName);
  if (!file) {
    return notFound(res);
  }
  const contentType = getFileContentType(fileName);
  res.statusCode = 200;
  res.setHeader("Content-type", contentType);
  res.end(file, "utf-8");
};
