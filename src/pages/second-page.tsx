import React from 'react';
import { withTranslation } from '../i18n';
import { NextPageProps } from '../types/NextPageProps';
import Head from 'next/dist/next-server/lib/head';

const SecondPage = ({ t }: NextPageProps) => (
    <>
        <Head>
            <title>Second Page</title>
        </Head>
        <main>
            <div>
                <h1>{t('h1')}</h1>
            </div>
        </main>
    </>
);

SecondPage.getInitialProps = async () => ({
    namespacesRequired: ['second-page', 'footer'],
});

export default withTranslation('second-page')(SecondPage);
