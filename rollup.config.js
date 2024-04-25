import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";

// rollup.config.js
export default {
  input: "express.js",
  plugins: [
    nodeResolve(),
    commonjs(),
    json(),
    process.env.NODE_ENV === "production" && terser(),
    copy({
      targets: [{ src: "src/common/**/*.json", dest: "dist/common" }],
    }),
  ],
  output: {
    file: "dist/server/index.js",
    format: "es",
    name: "GithubReadmeStats",
    sourcemap: process.env.NODE_ENV === "production" ? false : "inline",
  },
};
