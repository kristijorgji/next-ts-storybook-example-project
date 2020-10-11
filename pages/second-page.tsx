import { withTranslation, Link } from '../i18n'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import {NextPageProps} from "../types/NextPageProps";

const SecondPage = ({ t }: NextPageProps) => (
    <>
        <main>
            <Header title={t('h1')} />
            <Link href='/'>
                <button
                    type='button'
                >
                    {t('back-to-home')}
                </button>
            </Link>
        </main>
        <Footer />
    </>
);

SecondPage.getInitialProps = async () => ({
    namespacesRequired: ['second-page', 'footer'],
});

export default withTranslation('second-page')(SecondPage)
