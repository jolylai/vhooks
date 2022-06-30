import pkg from "./package.json";

import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";
import esbuild from "rollup-plugin-esbuild";

const name = "usevhooks";

const createBanner = () => {
  return `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} 
  * @license MIT
  */`;
};

const createBaseConfig = () => {
  return {
    input: "hooks/index.ts",
    external: ["vue"],
    plugins: [peerDepsExternal(), esbuild(), resolve(), commonjs(), json()],
    output: {
      sourcemap: false,
      banner: createBanner(),
      externalLiveBindings: false,
      globals: {
        vue: "Vue",
      },
    },
  };
};

function mergeConfig(baseConfig, configB) {
  const config = Object.assign({}, baseConfig);
  // plugin
  if (configB.plugins) {
    baseConfig.plugins.push(...configB.plugins);
  }

  // output
  config.output = Object.assign({}, baseConfig.output, configB.output);

  return config;
}

function createFileName(formatName) {
  return `dist/${formatName}.js`;
}

// es-bundle
const esBundleConfig = {
  plugins: [
    replace({
      __DEV__: `(process.env.NODE_ENV !== 'production')`,
      preventAssignment: true,
    }),
  ],
  output: {
    file: createFileName("esm-bundler"),
    format: "es",
  },
};

// es-browser
const esBrowserConfig = {
  plugins: [
    replace({
      __DEV__: true,
    }),
  ],
  output: {
    file: createFileName("esm-browser"),
    format: "es",
  },
};

// es-browser.prod
const esBrowserProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
    }),
  ],
  output: {
    file: createFileName("esm-browser.prod"),
    format: "es",
  },
};

// cjs
const cjsConfig = {
  plugins: [
    replace({
      __DEV__: true,
    }),
  ],
  output: {
    file: createFileName("cjs"),
    format: "cjs",
  },
};

// cjs.prod
const cjsProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
    }),
  ],
  output: {
    file: createFileName("cjs.prod"),
    format: "cjs",
  },
};

// global
const globalConfig = {
  plugins: [
    replace({
      __DEV__: true,
      "process.env.NODE_ENV": true,
    }),
  ],
  output: {
    file: createFileName("global"),
    format: "iife",
    name,
  },
};
// global.prod
const globalProdConfig = {
  plugins: [
    terser(),
    replace({
      __DEV__: false,
    }),
  ],
  output: {
    file: createFileName("global.prod"),
    format: "iife",
    name,
  },
};

const formatConfigs = [
  esBundleConfig,
  // esBrowserProdConfig,
  // esBrowserConfig,
  // cjsConfig,
  // cjsProdConfig,
  // globalConfig,
  // globalProdConfig,
];

function createPackageConfigs() {
  return formatConfigs.map((formatConfig) => {
    return mergeConfig(createBaseConfig(), formatConfig);
  });
}

// export default createPackageConfigs();

export default [
  // iife
  // {
  //   input: "hooks/index.ts",
  //   external: ["vue"],
  //   plugins: [peerDepsExternal(), esbuild(), resolve(), commonjs(), json()],
  //   output: {
  //     sourcemap: false,
  //     banner: createBanner(),
  //     externalLiveBindings: false,
  //     globals: {
  //       vue: "Vue",
  //     },

  //     format: 'iife',
  //     file: createFileName('iife'),
  //     name: 'usevhooks',
  //   },
  // },
  // esm
  {
    input: "hooks/index.ts",
    external: ["vue"],
    plugins: [esbuild(), resolve(), commonjs(), json()],
    output: {
      sourcemap: true,
      banner: createBanner(),
      externalLiveBindings: false,
      globals: {
        vue: "Vue",
      },

      file: createFileName("esm-bundler"),
      format: "es",
    },
  },
];
