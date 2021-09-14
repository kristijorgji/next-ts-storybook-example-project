import { SSRConfig, withTranslation } from 'next-i18next';
import { NextPageProps } from '../types/NextPageProps';

import React from 'react';
import { STORAGE_KEYS } from '../services/storage';
import Head from 'next/head';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LOCALE } from '../constants';
import { getRouteSource } from '../getRouteSource';
import { routes } from '../../routes';
import LoginPage, { Credentials } from '../components/pages/LoginPage/LoginPage';

const Login = ({ t }: NextPageProps) => {
    const onSubmit = async (c: Credentials) => {
        await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(c),
        }).then(async (res) => {
            if (res.status === 200) {
                const loginResponse = await res.json();
                window.localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, loginResponse.token);
                window.location.href = getRouteSource(routes.INDEX);
            } else {
                window.alert('login-page:wrongCredentials');
            }
        });
    };

    return (
        <>
            <Head>
                <title>{t('login-page:pageTitle')}</title>
            </Head>
            <LoginPage
                onSubmit={onSubmit}
                i18n={{
                    emailLabel: t('login-page:emailLabel'),
                    passwordLabel: t('login-page:passwordLabel'),
                    loginBtn: t('login-page:loginBtn'),
                }}
            />
        </>
    );
};

const tNamespaces = ['header', 'footer', 'login-page'];
export async function getStaticProps({ locale }: GetStaticPropsContext): Promise<GetStaticPropsResult<SSRConfig>> {
    return {
        props: {
            ...(await serverSideTranslations(locale || DEFAULT_LOCALE, tNamespaces)),
        },
    };
}

export default withTranslation(tNamespaces)(Login as React.FC);
