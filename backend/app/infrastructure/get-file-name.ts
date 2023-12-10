export const getFileNameFromUrl = (url?: string) => {
  if (!url) {
    return "";
  }
  const lastSlashIndex = url.lastIndexOf("/");
  if (-1 === lastSlashIndex) {
    return url;
  }
  return url.slice(lastSlashIndex + 1);
};
