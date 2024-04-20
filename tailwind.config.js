/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode : "class" , 
  theme: {
    extend: {},
    fontFamily : {
      "popoins" : ["Poppins" , "sans-serif"],
      "martianMono" : ["Martian Mono" , "monospace"],
      "Quicksand" : ["Quicksand", "sans-serif"] ,
      "PTSansNarrow" : ["PT Sans Narrow", "sans-serif"] , 
      "IBM" : ["__IBM_Plex_Mono_d693b2", "__IBM_Plex_Mono_Fallback_d693b2",  "monospace"],
      "DankMono" : ["Dank Mono" , "monospace"]
    },
  },
  plugins: [],
}


