/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
export default {
  plugins: ["prettier-plugin-tailwindcss"],
  printWidth: 120,
  quoteProps: "consistent",
  trailingComma: "es5",
  endOfLine: "lf",
  singleAttributePerLine: true,
};
