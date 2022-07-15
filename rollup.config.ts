import pkg from "./package.json";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import esbuild from "rollup-plugin-esbuild";
import { RollupOptions } from "rollup";
import { defineConfig } from "rollup";

const name = "usevhooks";

const createBanner = () => {
  return `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} 
  * @license MIT
  */`;
};

const plugins = [commonjs(), resolve(), json(), esbuild()];

const esmBuild: RollupOptions = {
  input: "hooks/index.ts",
  output: {
    format: "esm",
    entryFileNames: `[name].js`,
    dir: "dist",
  },
  plugins,
};

const config = defineConfig([]);

config.push(esmBuild);

export default config;
