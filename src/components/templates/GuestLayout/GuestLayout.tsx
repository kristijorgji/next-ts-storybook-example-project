import React from 'react';
import Footer from '../../organisms/Footer/Footer';
import { TFunction, withTranslation } from 'next-i18next';
import Header, { MenuItem } from '../../organisms/Header/Header';
import { routes } from '../../../../routes';

interface Props {
    readonly t: TFunction;
}
const GuestLayout: React.FC<Props> = ({ children, t }) => (
    <>
        <Header menuItems={getMenuItems(t)} />
        {children}
        <Footer />
    </>
);

const tNamespaces = ['header', 'footer'];
export default withTranslation(tNamespaces)(GuestLayout);

function getMenuItems(t: TFunction): MenuItem[] {
    return [
        {
            name: routes.INDEX,
            text: t('index'),
        },
        {
            name: routes.LOGIN,
            text: t('login'),
        },
    ];
}
