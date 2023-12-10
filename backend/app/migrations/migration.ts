import { pool } from "../shared/db-pool";

pool.query("CREATE DATABASE IF NOT EXISTS przytulisko", (err, rows, fields) => {
  if (err) {
    console.log("bład migracji", err);
    return;
  } else {
    console.log("powodzenie", rows), console.log("pola", fields);
  }
  pool.end()
});
