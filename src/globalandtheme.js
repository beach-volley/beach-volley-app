import { createGlobalStyle, ThemeProvider } from "styled-components";
import background_image from "./assets/bg.png";

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0; 
    padding: 0; 
    border: 0;
    #g_a11y_announcement {
      height: 0;
    }
  }

  *, *::after, *::before {
    box-sizing: border-box;
  }
  
  input, select, div {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
            box-sizing: border-box;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
}

h1, h2, p, span, input, textarea, label, body, button, html, label {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: bold; 
  letter-spacing: -1px; 
  line-height: 1;
}

`;

const theme = {
  colors: {
    gulfBlue: "#011458",
    gulfBlueTransparent: "1, 20, 88, 0.75",
    gorse: "#FBFF48",
    malibu: "#81CAFF",
    mineShaft: "#333333",
  },
  margins: {
    small: "2.5rem",
    medium: "5rem",
    large: "10rem",
  },
  fontSizes: {
    small: "0.75em",
    medium: "1.2em",
    large: "3em",
  },

  mediaQuery: {
    mobileWidth: "480px",
    tabletWidth: "770px",
    smallDesktopWidth: "990px",
    desktopWidth: "1400px",
  },

  backGroundImage: () => `
  background-image: url(${background_image});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow-x: hidden;`,
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export { GlobalStyle, Theme };
