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
      alias: {
        events: "events",
        buffer: "buffer",
        util: "util",
        path: "path-browserify",
        url: "url",
      },
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.app.json",
      declaration: true,
      declarationDir: "./dist/types",
    }),
    postcss({
      extensions: [".css"],
      plugins: [
        tailwindcss("./tailwind.config.js"), // Make sure this path is correct
        autoprefixer(),
      ],
      extract: "styles.css",
      minimize: true,
      modules: false,
    }),
    url(),
    json(),
    replace({
      "process.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
      "process.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY": JSON.stringify(
        process.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY,
      ),
      preventAssignment: true,
    }),
  ],
  external: ["react", "react-dom", "react-router-dom"],
};
