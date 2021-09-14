import React from 'react';
import { withTranslation, TFunction } from 'next-i18next';
import styles from '../../../styles/Home.module.scss';

interface Props {
    readonly t: TFunction;
}

const Footer: React.FC<Props> = ({ t }: { readonly t: TFunction }) => (
    <footer className={styles.footer}>{t('footer:description')}</footer>
);

export default withTranslation('footer')(Footer);
