import { join } from "node:path";

export const getFileNameFromUrl = (url?: string) => {
  if (!url) {
    return "";
  }
  if (url.includes("assets")) {
    const folders = url.split("/");
    let path_to_file = "";
    for (const folder of folders) {
      path_to_file = join(path_to_file, folder);
    }
    return path_to_file;
  }
  const lastSlashIndex = url.lastIndexOf("/");
  if (-1 === lastSlashIndex) {
    console.log(url, -1);
    return "index.html";
  }
  if ("" === url.slice(lastSlashIndex + 1)) {
    return "index.html";
  }
  return url.slice(lastSlashIndex + 1);
};
