import * as http from "http";

const hostname = "0.0.0.0";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.method === "GET" && req.url === "/") {
    res.end("Witaj, świecie!");
  } else {
    res.statusCode = 404;
    res.end("Nie znaleziono strony!\n");
  }
});

server.listen(port, hostname, () => {
  console.log(`Serwer działa na http://${hostname}:${port}/`);
});