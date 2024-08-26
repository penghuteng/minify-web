import { rimraf } from "rimraf";
import path from "path";

const distPath = path.resolve(__dirname, "../dist");

rimraf(distPath);