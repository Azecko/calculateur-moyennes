import babelParser from "@babel/eslint-parser";
import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            parser: babelParser,
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        ignores: [
            "node_modules/*",
        ],
    }
];
