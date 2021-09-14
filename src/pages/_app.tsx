import React, { useMemo, useState } from 'react';
import '../styles/globals.scss';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Light from '../styles/themes/Light/Light';
import { appWithTranslation } from 'next-i18next';
import { AppProps } from 'next/app';
import LoggedLayout from '../components/templates/LoggedLayout/LoggedLayout';
import GuestLayout from '../components/templates/GuestLayout/GuestLayout';
import Head from 'next/head';
import nextI18NextConfig from '../../next-i18next.config.js';
import { isApiLoggedIn } from '../services/api';
import { UserContext } from '../context/UserContext';
import { UserState } from '../types/common';
import { useRouter } from 'next/router';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const MyApp = function ({ Component, pageProps }: AppProps) {
    // both for client and server side usage in getRouteSource
    const router = useRouter();
    // @ts-ignore
    global.locale = pageProps._nextI18Next?.initialLocale || router.locale;

    const getLayoutFn =
        // @ts-ignore
        (Component.WrappedComponent && Component.WrappedComponent.getLayout) ||
        // @ts-ignore
        (Component.getLayout && Component.getLayout) ||
        undefined;
    const PageLayout = (getLayoutFn && getLayoutFn(pageProps)) || (isApiLoggedIn() ? LoggedLayout : GuestLayout);

    const [user, setUser] = useState<UserState | undefined>(undefined);
    const contextValue = useMemo(() => ({ user, setUser }), [user]);

    return (
        <>
            <GlobalStyle />
            <UserContext.Provider value={contextValue}>
                <ThemeProvider theme={Light}>
                    <Head>
                        <link rel="icon" href="/cropped-logo-32x32.png" sizes="32x32" />
                        <link rel="icon" href="/cropped-logo-192x192.png" sizes="192x192" />
                        <link rel="apple-touch-icon-precomposed" href="/cropped-logo-180x180.png" />
                    </Head>
                    <PageLayout>
                        <Component {...pageProps} />
                    </PageLayout>
                </ThemeProvider>
            </UserContext.Provider>
        </>
    );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
