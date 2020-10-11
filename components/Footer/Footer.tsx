import {version} from 'next-i18next/package.json'
import {withTranslation} from '../../i18n'
import {TFunction} from "next-i18next";

const Footer: any = ({t}: { readonly t: TFunction }) => (
    <footer>
        <p>
            {t('description')}
        </p>
        <p>
            next-i18next v
            {version}
        </p>
    </footer>
);

export default withTranslation('footer')(Footer)
