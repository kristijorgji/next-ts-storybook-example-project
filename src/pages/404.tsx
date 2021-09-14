import React from 'react';
import { NextPageProps } from '../types/NextPageProps';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { SSRConfig, withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LOCALE } from '../constants';
import Head from 'next/head';

const Custom404 = ({ t }: NextPageProps) => {
    return (
        <>
            <Head>
                <title>{t('404-page:pageTitle')}</title>
            </Head>
            <p>{t('404-page:not-found')}</p>
        </>
    );
};

const tNamespaces = ['header', 'footer', '404-page'];
export async function getStaticProps({ locale }: GetStaticPropsContext): Promise<GetStaticPropsResult<SSRConfig>> {
    return {
        props: {
            ...(await serverSideTranslations(locale || DEFAULT_LOCALE, tNamespaces)),
        },
    };
}

export default withTranslation(tNamespaces)(Custom404 as React.FC);
