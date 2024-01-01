import { cwd } from "node:process";
import * as path from "node:path";

const rootDir = () => {
  if ("dev" === process.env.MODE) {
    return path.join(cwd(), "dist");
  } else {
    return cwd();
  }
};

export const APP_FRONT_STATIC_DIRECTORY = path.join(rootDir(), "frontend");
export const APP_BACKEND_MIGRATIONS = path.join(rootDir(), "server", "migrations", "data");
export const APP_BACKEND_SEEDS = path.join(rootDir(), "server", "migrations", "seeds");
