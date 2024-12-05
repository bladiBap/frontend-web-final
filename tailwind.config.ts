import {nextui} from '@nextui-org/react';
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#00376d"
      },
    },
  },
  plugins: [
    nextui(),
    plugin(({ addComponents }) => {
      addComponents({
        ".typography-h1" : {
          "@apply text-2xl font-bold text-primary": ""
        },
        ".typography-h2" : {
          "@apply text-xl font-bold text-primary": ""
        },
        ".typography-h3" : {
          "@apply text-lg font-bold text-primary": ""
        },
      })
    })
  ],
};
export default config;
