import * as http from "http";
import { notFound } from "../bundles/default-responses/default-responses";
import { loginController } from "./login/login.controller";
import { registerController } from "./register/register.controller";
import { remindPasswordController } from "./remind-password/remind-password.controller";
import { resetPasswordController } from "./reset-passowrd/reset-password.controller";
import { sessionController } from "./session/session.controller";
import { logoutController } from "./logout/logout.controller";

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
      case "logout":
        logoutController(method, req, res);
        break;
      case "register":
        registerController(method, res, body);
        break;
      case "remind-password":
        remindPasswordController(method, res, body);
        break;
      case "reset-password":
        resetPasswordController(method, res, body);
        break;
      case "session":
        sessionController(method, req, res);
        break;
      default:
        notFound(res);
        break;
    }
  });
};
