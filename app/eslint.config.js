import babelParser from "@babel/eslint-parser";
import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            parser: babelParser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                Atomics: "readonly",
                SharedArrayBuffer: "readonly",
            },
        },
        ignores: [
            "node_modules/*",
        ],
    }
];
