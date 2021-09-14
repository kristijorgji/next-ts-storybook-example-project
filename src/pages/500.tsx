import React from 'react';
import { NextPageProps } from '../types/NextPageProps';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { SSRConfig, withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LOCALE } from '../constants';
import Head from 'next/head';

const Custom500 = ({ t }: NextPageProps) => {
    return (
        <>
            <Head>
                <title>{t('500-page:pageTitle')}</title>
            </Head>
            <p>{t('500-page:server-side-error')}</p>
        </>
    );
};

const tNamespaces = ['header', 'footer', '500-page'];
export async function getStaticProps({ locale }: GetStaticPropsContext): Promise<GetStaticPropsResult<SSRConfig>> {
    return {
        props: {
            ...(await serverSideTranslations(locale || DEFAULT_LOCALE, tNamespaces)),
        },
    };
}

export default withTranslation(tNamespaces)(Custom500 as React.FC);
