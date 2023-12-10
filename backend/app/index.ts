import * as http from "http";
import { appMainUrlSwitch } from "./app-main-url-switch";

const port = 3000;

const server = http.createServer((req: http.IncomingMessage, res) => {
  if ("dev" === process.env.MODE) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  return appMainUrlSwitch(req, res);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Serwer działa na http://localhost:${port} działa?`);
});
