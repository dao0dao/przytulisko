import * as http from "http";
import { appMainController } from "./app-main-controller";

const port = 3000;

const server = http.createServer((req, res) => {
  if ("dev" === process.env.MODE) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, *");
  }
  return appMainController(req, res);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
