import { readFileSync } from "fs";
import { resolve } from "path";

export default function logo() {
  return readFileSync(resolve(__dirname, "../static/logo.txt")).toString().trim();
}
