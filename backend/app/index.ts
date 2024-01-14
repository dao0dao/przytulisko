import * as http from "http";
import { appMainController } from "./app-main-controller";
import { removeExpiredCookies } from "./clear-session";

const port = 3000;
const hour_interval = 3600 * 1000;
// const hour_interval = 60 * 1000;

const server = http.createServer((req, res) => {
  if ("dev" === process.env.MODE) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, *");
  }
  if ("OPTIONS" === req.method) {
    res.statusCode = 200;
    res.end();
    return;
  }
  return appMainController(req, res);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Serwer działa na http://localhost:${port}`);
  setInterval(() => {
    console.log("removing...");
    removeExpiredCookies();
  }, hour_interval);
});
