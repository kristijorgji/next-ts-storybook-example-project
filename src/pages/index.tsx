import React from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import Example from '../components/Example/Example';
import { withTranslation } from '../i18n';
import { NextPageProps } from '../types/NextPageProps';

const Home = ({ t }: NextPageProps) => {
    return (
        <>
            <Head>
                <title>Demo</title>
            </Head>
            <main className={styles.main}>
                <div className={styles.container}>
                    <h1 className={styles.title}>{t('h1')}</h1>
                    <Example />
                </div>
            </main>
        </>
    );
};

Home.getInitialProps = async () => ({
    namespacesRequired: ['common', 'footer'],
});

export default withTranslation('common')(Home);
