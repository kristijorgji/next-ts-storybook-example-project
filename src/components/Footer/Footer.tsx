import React from 'react';
import { withTranslation } from '../../i18n';
import { TFunction } from 'next-i18next';
import styles from '../../styles/Home.module.scss';

const Footer: any = ({ t }: { readonly t: TFunction }) => (
    <footer className={styles.footer}>
        <a href="https://github.com/kristijorgji/" target="_blank" rel="noopener noreferrer">
            {t('description')}
        </a>
    </footer>
);

export default withTranslation('footer')(Footer);
