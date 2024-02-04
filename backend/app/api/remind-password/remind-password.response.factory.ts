import * as http from "http";

export const correctRemindPasswordResponse = async (link: string, res: http.ServerResponse) => {
  const data = { location: link };
  res.end(JSON.stringify(data));
};
