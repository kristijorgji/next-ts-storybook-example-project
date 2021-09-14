import React, { useContext } from 'react';
import Head from 'next/head';
import { SSRConfig, withTranslation } from 'next-i18next';
import { NextPageProps } from '../types/NextPageProps';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LOCALE } from '../constants';
import { UserContext } from '../context/UserContext';

const Index = ({ t }: NextPageProps) => {
    const { user } = useContext(UserContext);

    return (
        <>
            <Head>
                <title>{t('index-page:pageTitle')}</title>
            </Head>
            {user && user.isLoggedIn && user.user && <div>{t('index-page:greetLogged', { userId: user.user.id })}</div>}
            {user && !user.isLoggedIn && <div>{t('index-page:greetGuest')}</div>}
        </>
    );
};

const tNamespaces = ['header', 'footer', 'index-page'];
export async function getStaticProps({ locale }: GetStaticPropsContext): Promise<GetStaticPropsResult<SSRConfig>> {
    return {
        props: {
            ...(await serverSideTranslations(locale || DEFAULT_LOCALE, tNamespaces)),
        },
    };
}

export default withTranslation(tNamespaces)(Index as React.FC);
