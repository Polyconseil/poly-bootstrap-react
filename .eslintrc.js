module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "react",
    "unicorn",
    "prettier",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:unicorn/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        printWidth: 80,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        tabWidth: 2,
        jsxSingleQuote: false,
        trailingComma: 'all',
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'always',
        htmlWhitespaceSensitivity: 'css',
        endOfLine: 'lf',
        embeddedLanguageFormatting: 'auto',
        useTabs: false,
      }
    ],
  },
};
