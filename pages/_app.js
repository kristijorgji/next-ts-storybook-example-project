import '../styles/globals.scss'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import Light from "../styles/themes/Light/Light";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export default function App({ Component, pageProps }) {
  return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={Light}>
          <Component {...pageProps} />
        </ThemeProvider>
      </>
  )
}
