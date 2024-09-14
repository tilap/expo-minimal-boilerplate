module.exports = {
  root: true,
  extends: ["@react-native-community", "plugin:@typescript-eslint/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "eslint-comments", "import", "prettier"],
  ignorePatterns: ["coverage/**/*", ".eslintrc.js"],
  rules: {
    "no-unused-vars": "off", // to not confict with typescript unused rule
    indent: "off", // to not confict with prettier

    "no-console": ["error", { allow: ["error"] }],

    // https://eslint.org/docs/rules/require-await
    "require-await": "error",

    // https://eslint.org/docs/2.0.0/rules/max-depth
    "max-depth": ["warn", 6],

    // https://eslint.org/docs/rules/max-lines
    "max-lines": [
      "warn",
      {
        max: 600,
        skipBlankLines: true,
        skipComments: true,
      },
    ],

    "sort-imports": [
      "error",
      {
        ignoreCase: false,
        ignoreDeclarationSort: true,
        ignoreMemberSort: false,
        memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
        allowSeparatedGroups: false,
      },
    ],

    // import
    "import/no-extraneous-dependencies": "off",
    "import/extensions": [1, "never", { json: "always" }],
    "import/first": 1,
    "import/max-dependencies": [1, { max: 30 }],
    "import/newline-after-import": 1,
    "import/no-absolute-path": "error",
    "import/no-anonymous-default-export": [
      "warn",
      {
        allowArray: true,
        allowArrowFunction: false,
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowCallExpression: true,
        allowLiteral: true,
        allowObject: true,
      },
    ],
    "import/no-duplicates": 1,
    "import/no-named-default": 1,
    "import/no-unassigned-import": 1,
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],

    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: true,
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
      },
    ],

    "@typescript-eslint/no-floating-promises": "off",
    "@typescript-eslint/no-explicit-any": "warn",

    "eslint-comments/disable-enable-pair": ["error", { allowWholeFile: true }],
    "eslint-comments/require-description": ["error", { ignore: [] }],

    "prettier/prettier": "error",
  },
  overrides: [
    {
      files: ["**/*.test.ts", "**/*.spec.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off", // Disable the rule for test files
      },
    },
  ],
};
