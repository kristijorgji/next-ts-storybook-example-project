import React, { useContext, useState } from 'react';
import Header, { MenuItem } from '../../organisms/Header/Header';
import Footer from '../../organisms/Footer/Footer';
import { TFunction, withTranslation } from 'next-i18next';
import { jsonFetcher } from '../../../utils/fetchers';
import { UserState } from '../../../types/common';
import { UserContext } from '../../../context/UserContext';
import Loader from '../../molecules/Loader/Loader';
import { routes } from '../../../../routes';
import { logout } from '../../../utils/auth';

interface Props {
    readonly t: TFunction;
}
const LoggedLayout: React.FC<Props> = ({ children, t }) => {
    const isClientSide = typeof window !== 'undefined';
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState<Response | Error | undefined>();

    let isLoading = false;

    if (isClientSide && !user && !error) {
        isLoading = true;
        jsonFetcher<UserState>('/api/user')
            .then((r) => {
                setUser(r);
            })
            .catch((reason) => setError(reason));
    }

    return (
        <>
            <Header menuItems={getMenuItems(t)} user={user?.user} onLogoutClicked={() => logout()} />
            {isLoading && <Loader />}
            {error && (
                <div>
                    <p>
                        {' '}
                        Error fetching data:{' '}
                        {(error as Response).status !== undefined
                            ? (error as Response).status
                            : (error as Error).message}
                    </p>
                    <p>Please try again later by refreshing the page, or contact support</p>
                </div>
            )}
            {!error && user && children}
            <Footer />
        </>
    );
};

const tNamespaces = ['header', 'footer'];
export default withTranslation(tNamespaces)(LoggedLayout);

function getMenuItems(t: TFunction): MenuItem[] {
    return [
        {
            name: routes.INDEX,
            text: t('index'),
        },
        {
            name: routes.PROFILE,
            text: t('profile'),
        },
    ];
}
