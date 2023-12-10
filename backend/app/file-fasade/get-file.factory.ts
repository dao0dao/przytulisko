import { readFile } from "node:fs/promises";
import * as path from "node:path";
import { APP_FRONT_STATIC_DIRECTORY } from "../shared/file-directory";

export const getFile = (fileName: string) => {
  const filePath = path.join(APP_FRONT_STATIC_DIRECTORY, fileName);
  return readFile(filePath).catch((err) => {
    if (err) null;
  });
};
