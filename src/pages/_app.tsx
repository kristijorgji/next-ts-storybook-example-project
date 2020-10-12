import React from 'react';
import '../styles/globals.scss';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Light from '../styles/themes/Light/Light';
import { appWithTranslation } from '../i18n';
import App, { AppContext, AppProps } from 'next/app';
import Layout from '../components/Layout/Layout';
import Head from 'next/head';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const MyApp = function ({ Component, pageProps }: AppProps) {
    return (
        <>
            <GlobalStyle />
            <ThemeProvider theme={Light}>
                <Head>
                    <link rel="icon" href="/cropped-logo-32x32.png" sizes="32x32" />
                    <link rel="icon" href="/cropped-logo-192x192.png" sizes="192x192" />
                    <link rel="apple-touch-icon-precomposed" href="/cropped-logo-180x180.png" />
                </Head>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    );
};

MyApp.getInitialProps = async (appContext: AppContext) => ({
    ...(await App.getInitialProps(appContext)),
});

export default appWithTranslation(MyApp);
