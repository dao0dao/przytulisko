import * as http from "http";
import { notFound } from "../bundles/default-responses/default-responses";
import { authorizationController } from "./authorization/authorization.controller";

export const apiSwitchUrl = async (req: http.IncomingMessage, res: http.ServerResponse) => {
  let body = "";
  const long_url = req.url;
  const method = req.method;
  if (!long_url || !method) {
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
        authorizationController(child_url, method, res, body);
        break;
      default:
        notFound(res);
        break;
    }
  });
};
