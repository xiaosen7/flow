// eslint-disable-next-line @typescript-eslint/no-var-requires
module.exports = require("eslint-define-config").defineConfig({
  settings: {
    "import/resolver": {
      typescript: true,
    },
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "next/core-web-vitals",
    "plugin:tailwindcss/recommended",
    "plugin:storybook/recommended",
    // "eslint:recommended",
    // "plugin:import/recommended",
    // "plugin:@typescript-eslint/eslint-recommended",
    // "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  rules: {
    "import/no-cycle": "error",
  },
  overrides: [
    {
      files: ["modules/shared/**"],
      rules: {
        "import/no-cycle": "off",
      },
    },
  ],
});
