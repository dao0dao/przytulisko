import { readFile, readdir } from "fs/promises";
import { APP_BACKEND_SEEDS } from "../shared/file-directory";
import { join, parse } from "path";
import { pool } from "../shared/db-pool";
import * as crypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const seedFile = (content: string, file: string, currentFileIndex: number, lastFileIndex: number) => {
  pool.query(content, (err) => {
    if (err) {
      console.log(`niepowodzenie seeda: ${file}, błąd: ${err}`);
    } else {
      console.log(`seed wykonany: ${file}`);
    }
    if (currentFileIndex === lastFileIndex) {
      pool.end();
    }
  });
};

const createAdmin = async (file: string, path_to_file: string, content: string, currentFileIndex: number, lastFileIndex: number) => {
  const slatRounds = 10;
  const id = uuidv4();
  const password = await crypt.hash("admin", slatRounds);
  content = content.replace("{{password}}", password).replace(/\{\{id\}\}/g, id);
  seedFile(content, file, currentFileIndex, lastFileIndex);
};

const makeSeed = async () => {
  const files = await readdir(APP_BACKEND_SEEDS);
  for (const [index, file] of files.entries()) {
    if (".txt" === parse(file).ext) {
      const path_to_file = join(APP_BACKEND_SEEDS, file);
      const content = await readFile(path_to_file, "utf-8");
      if (parse(file).name.includes("admin")) {
        await createAdmin(file, path_to_file, content, index, file.length - 1);
      } else {
        seedFile(content, file, index, file.length - 1);
      }
    }
  }
};
makeSeed();
