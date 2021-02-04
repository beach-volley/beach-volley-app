import { createGlobalStyle, ThemeProvider } from "styled-components";
import background_image from './assets/bg.png'

const GlobalStyle = createGlobalStyle`

  body {
    margin: 0; 
    padding: 0; 
    border: 0;
    background-image: url(${background_image});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

`;

const theme = {
  colors: {
    gulfBlue: '#011458',
    gorse: '#FBFF48',
    malibu: '#81CAFF',
    mineShaft: '#333333'
  },
  margins: {
    small: '2.5rem',
    medium: '5rem',
    large: '10rem',
  },
  fonts: ["sans-serif", "Roboto"],
  fontSizes: {
    small: "0.75em",
    medium: "2em",
    large: "3em"
  },

  mediaQuery: {
    mobileWidth: '480px',
    tabletWidth: '770px',
    smallDesktopWidth: '990px',
    desktopWidth: '1200px',
  }

}

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export {GlobalStyle, Theme};