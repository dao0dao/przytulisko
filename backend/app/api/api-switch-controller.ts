import * as http from "http";
import { notFound } from "../bundles/default-responses/default-responses";
import { loginController } from "./login/login.controller";
import { registerController } from "./register/register.controller";

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
    // const child_url = routs.slice(1).join("/");
    switch (routs[1]) {
      case "login":
        loginController(method, res, body);
        break;
      case "register":
        registerController(method, res, body);
        break;
      default:
        notFound(res);
        break;
    }
  });
};
