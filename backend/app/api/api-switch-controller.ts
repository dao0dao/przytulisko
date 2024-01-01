import * as http from "http";
import { notFound } from "../shared/default-responses";
import { authorizationController } from "./authorization/authorization.controller";

export const apiSwitchUrl = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  let body = "";
  const long_url = req.url;
  if (!long_url) {
    return notFound(res);
  }
  const routs = long_url.split("/").slice(1);
  req.on("data", (chunk) => {
    body += chunk;
  });
  req.on("end", () => {
    const child_url = routs.slice(1).join("/");
    switch (routs[1]) {
      case "login":
        authorizationController(child_url, res, body);
        break;
      default:
        notFound(res);
        break;
    }
  });
};
