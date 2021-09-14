import React from 'react';
import Head from 'next/head';
import { SSRConfig, withTranslation } from 'next-i18next';
import { NextPageProps } from '../types/NextPageProps';
import { GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { DEFAULT_LOCALE } from '../constants';
import withClientAuth from '../utils/withClientAuth';

const Profile = ({ t }: NextPageProps) => {
    return (
        <>
            <Head>
                <title>{t('profile-page:pageTitle')}</title>
            </Head>
            <main>{t('profile-page:desc')}</main>
        </>
    );
};

const tNamespaces = ['header', 'footer', 'profile-page'];
export async function getStaticProps({ locale }: GetStaticPropsContext): Promise<GetStaticPropsResult<SSRConfig>> {
    return {
        props: {
            ...(await serverSideTranslations(locale || DEFAULT_LOCALE, tNamespaces)),
        },
    };
}

export default withClientAuth(withTranslation(tNamespaces)(Profile as React.FC));
