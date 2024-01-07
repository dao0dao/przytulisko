import * as http from "http";

export const correctLoginResponse = (res: http.ServerResponse) => {
  const data = { loginStatus: true };
  res.statusCode = 200;
  const cookie = "session=wartosc+-ciasteczka; Max-Age=3600; Secure; HttpOnly; SameSite=Strict; path=/";
  res.setHeader("Content-type", "application/json");
  res.setHeader("Set-Cookie", cookie);
  res.end(JSON.stringify(data));
};
