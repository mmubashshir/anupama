/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  endOfLine: "lf",
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  semi: true,
  singleQuote: true,
  tailwindAttributes: ["cn"],
  tailwindFunctions: ["cn"],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  importOrder: [
    "^react$",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/env",
    "",
    "^~/components/ui/(.*)$",
    "",
    "^~/components/(.*)$",
    "",
    "^~/utils/(.*)$",
    "",
    "^~/assets/svgs/(.*)$",
    "",
    "^~/assets/(.*)$",
    "",
    "^~/services/(.*)$",
    "",
    "^~/models/(.*)$",
    "",
    "^[./]",
    "<TYPES>",
  ],
};

export default config;
