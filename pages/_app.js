import '../styles/globals.scss'
import {createGlobalStyle, ThemeProvider} from 'styled-components'
import Light from "../styles/themes/Light/Light";
import {appWithTranslation} from '../i18n'
import App from "next/app";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const MyApp = function({Component, pageProps}) {
    return (
        <>
            <GlobalStyle/>
            <ThemeProvider theme={Light}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
};

MyApp.getInitialProps = async (appContext) => ({...await App.getInitialProps(appContext)});


export default appWithTranslation(MyApp);
