import * as path from "node:path";

export const getFileContentType = (fileName: string) => {
  const extName = path.extname(fileName);
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
    case ".svg":
      contentType = "image/svg+xml";
      break;
    default:
      contentType = "text/html";
  }
  return contentType;
};
