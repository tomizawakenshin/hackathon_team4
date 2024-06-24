import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "blue-300": "#06C0E0",
        "yellow-300": "#FFBC5A",
        "red-300": "#FF5757",
        "green-300": "#7ED957",
        "purple-300": "#CB6CE5",
        "gray-300": "#555454",
      },
    },
  },
  plugins: [],
};
export default config;
