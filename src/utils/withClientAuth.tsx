import React from 'react';
import { useRouter } from 'next/router';
import { isApiLoggedIn } from '../services/api';

export default function withClientAuth<P>(WrappedComponent: React.ComponentType<P>): (props: P) => null | JSX.Element {
    const withClientAuth = (props: P) => {
        if (typeof window !== 'undefined') {
            const Router = useRouter();
            if (!isApiLoggedIn()) {
                Router.replace('/login');
                return null;
            }
            return <WrappedComponent {...props} />;
        }

        // If we are on server, return null
        return null;
    };
    return withClientAuth;
}
