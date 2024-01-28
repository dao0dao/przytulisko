import * as http from "http";

export const correctRemindPasswordResponse = async (link: string, req: http.IncomingMessage, res: http.ServerResponse) => {
  const location = req.headers.referer + "#/remind-password/" + link;
  res.statusCode = 302;
  res.setHeader("location", location);
  res.end();
};
