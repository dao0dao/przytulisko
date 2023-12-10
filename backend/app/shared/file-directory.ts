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
