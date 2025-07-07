// tailwind.config.js
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    fontFamily: {
      orbitron: ["Orbitron", "sans-serif"],
      mono: ["Share Tech Mono", "monospace"], // optional extra
    },
  },
};
export const plugins = [];
