import React from 'react';
import { Wrapper } from './Header.style';
import { i18n, Link, withTranslation } from '../../i18n';
import { TFunction } from 'next-i18next';
import { Router, withRouter } from 'next/router';

interface Props {
    readonly t: TFunction;
    router: Router;
}

const Header: React.FunctionComponent<Props> = ({ t, router }) => {
    const menuItems = getMenuItems(t);
    return (
        <Wrapper>
            <ul>
                {menuItems.map((mi, i) => (
                    <li key={i}>
                        <Link href={mi.href} passHref={true}>
                            <a className={router.pathname === mi.href ? 'active' : ''}>{mi.text}</a>
                        </Link>
                    </li>
                ))}
                <li>
                    <a href="#" onClick={() => i18n.changeLanguage(i18n.language === 'en' ? 'de' : 'en')}>
                        {t('change-locale')}
                    </a>
                </li>
            </ul>
        </Wrapper>
    );
};

interface MenuItem {
    href: string;
    text: string;
}

function getMenuItems(t: TFunction): MenuItem[] {
    return [
        {
            href: '/',
            text: t('home'),
        },
        {
            href: '/blog',
            text: t('blog'),
        },
        {
            href: '/second-page',
            text: t('secondPage'),
        },
    ];
}

export default withRouter(withTranslation('header')(Header as any) as any);
