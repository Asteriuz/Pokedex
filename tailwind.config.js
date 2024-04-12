/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // colors
      colors: {
        primary: "#DC0A2D",
        type: {
          bug: "#A7B723",
          dark: "#75574C",
          dragon: "#7037FF",
          electric: "#F9CF30",
          fairy: "#E69EAC",
          fighting: "#C12239",
          fire: "#F57D31",
          flying: "#A891EC",
          ghost: "#705598",
          normal: "#AAA67F",
          grass: "#74CB48",
          ground: "#DEC16B",
          ice: "#9AD6DF",
          poison: "#A43E9E",
          psychic: "#FB5584",
          rock: "#B69E31",
          steel: "#B7B9D0",
          water: "#6493EB",
        },
        dark: "#212121",
        medium: "#666666",
        light: "#EFEFEF",
        background: "#EFEFEF",
        white: "#FFFFFF",
      },
    },
    fontSize: {
      headline: "24px",
      "subtitle-1": "14px",
      "subtitle-2": "12px",
      "subtitle-3": "10px",
      body1: "10px",
      body2: "12px",
      body3: "16px",
      caption: "8px",
    },

    fontFamily: {
      poppins: ["Poppins_400Regular"],
      poppins_bold: ["Poppins_700Bold"],
    },
  },
  plugins: [],
};
