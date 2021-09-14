import React from 'react';
import { Wrapper } from './Header.style';
import { withTranslation, TFunction, i18n } from 'next-i18next';
import { Router, withRouter } from 'next/router';
import Link from '../../../core/Link/Link';
import { getRouteSource } from '../../../getRouteSource';
import { AppUser } from '../../../types/common';

interface Props {
    readonly t: TFunction;
    router: Router;
    menuItems: MenuItem[];
    onLogoutClicked?: () => void;
    user?: AppUser;
}

const Header: React.FC<Props> = (p) => {
    const changeLanguage = (language: string) => {
        i18n?.changeLanguage(language, () => {
            p.router.push(
                getRouteSource({
                    pathname: p.router.pathname,
                    query: p.router.query,
                }),
                undefined,
                { locale: language }
            );
        });
    };

    return (
        <Wrapper>
            <ul>
                {p.menuItems.map((mi, i) => (
                    <li key={i}>
                        <Link name={mi.name} passHref={true}>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className={p.router.pathname === mi.name ? 'active' : ''}>{mi.text}</a>
                        </Link>
                    </li>
                ))}
                <li>
                    <button onClick={() => changeLanguage(p.router.locale === 'en_US' ? 'de_DE' : 'en_US')}>
                        {p.t('change-locale')}
                    </button>
                    {p.user && <button onClick={() => p.onLogoutClicked?.()}>Logout</button>}
                </li>
            </ul>
        </Wrapper>
    );
};

export interface MenuItem {
    name: string;
    text: string;
}

const wt = withTranslation('header')(Header as React.FC);
export default withRouter(wt as React.FC) as React.FC<{
    menuItems: MenuItem[];
    user?: AppUser;
    onLogoutClicked?: () => void;
}>;
