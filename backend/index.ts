import * as http from "http";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Access-Control-Allow-Origin", "*");
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
