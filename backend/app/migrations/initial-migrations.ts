import { readFile, readdir } from "fs/promises";
import { pool } from "../shared/db-pool";
import { join, parse } from "path";

const path_to_folder = "./dist/server/migrations/data";

const makeMigrations = async () => {
  const files = await readdir(path_to_folder);
  for (const [index, file] of files.entries()) {
    if (".txt" === parse(file).ext) {
      const path_to_file = join(path_to_folder, file);
      const content = await readFile(path_to_file, "utf-8");

      pool.query(content, (err) => {
        if (err) {
          console.log(`niepowodzenie pliku: ${file}, błąd: ${err}`);
        } else {
          console.log(`migracja wykonana: ${file}`);
        }

        if (index === files.length - 1) {
          pool.end();
        }
      });
    }
  }
};
makeMigrations();
