// frontend/.eslintrc.js
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@babel/eslint-parser",
    requireConfigFile: true,
    babelOptions: {
      configFile: path.resolve(__dirname, "../babel.config.js"),
    },
  },
};
