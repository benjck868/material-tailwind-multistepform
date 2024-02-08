const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'MSF-Marine-blue': 'hsl(213, 96%, 18%)',
        'MSF-Purplish-blue': 'hsl(243, 100%, 62%)',
        'MSF-Pastel-blue': 'hsl(228, 100%, 84%)',
        'Light-blue': 'hsl(206, 94%, 87%)',
        'MSF-Strawberry-red': 'hsl(354, 84%, 57%)',

        'MSF-Cool-gray': 'hsl(231, 11%, 63%)',
        'MSF-Light-gray': 'hsl(229, 24%, 87%)',
        'MSF-Magnolia': 'hsl(217, 100%, 97%)',
        'MSF-Alabaster': 'hsl(231, 100%, 99%)',
      },
      fontFamily: {
        'ubuntu' : ['Ubuntu', 'sans-serif']
      }
    },
  },
  plugins: [],
});

