export const getFileNameFromUrl = (url?: string) => {
  if (!url) {
    return "";
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
