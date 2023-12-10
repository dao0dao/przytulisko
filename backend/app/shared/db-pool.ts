import * as mysql from "mysql2";

export const pool = mysql.createPool({
  host: process.env.DATABASE_host,
  user: process.env.DATABASE_username,
  password: process.env.DATABASE_password,
  database: process.env.DATABASE_database,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, 
  idleTimeout: 60000, 
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});