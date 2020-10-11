import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Example from "../components/Example/Example";
import { i18n, Link, withTranslation } from '../i18n'
import {NextPageProps} from "../types/NextPageProps";

const Home = ({t}: NextPageProps) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Demo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {t('h1')}
        </h1>
        <Example/>
          <button
              type='button'
              onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en')}
          >
              {t('change-locale')}
          </button>
          <Link href='/second-page'>
              <button
                  type='button'
              >
                  {t('to-second-page')}
              </button>
          </Link>
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/kristijorgji/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Demo by Kristi Jorgji
        </a>
      </footer>
    </div>
  )
};

Home.getInitialProps = async () => ({
    namespacesRequired: ['common', 'footer'],
});


export default withTranslation('common')(Home)

