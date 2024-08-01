import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import url from "@rollup/plugin-url";
import json from "@rollup/plugin-json";
import replace from "@rollup/plugin-replace";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

export default {
  input: "src/lib/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/index.es.js",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve({
      preferBuiltins: false,
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "./dist/types",
    }),
    postcss({
      extensions: [".css"],
      plugins: [tailwindcss("./tailwind.config.js"), autoprefixer()],
      extract: "styles.css",
      minimize: true,
      modules: false,
    }),
    url(),
    json(),
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
  ],
  external: ["react", "react-dom", "@heroicons/react", "@headlessui/react"],
};
