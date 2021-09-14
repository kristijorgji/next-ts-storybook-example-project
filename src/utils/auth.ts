import { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import { Session, withIronSession } from 'next-iron-session';
import { sessionConfig } from '../constants';
import { STORAGE_KEYS } from '../services/storage';
import { getRouteSource } from '../getRouteSource';
import { routes } from '../../routes';

export type NextIronRequest = NextApiRequest & { session: Session; locale: string | undefined };
// eslint-disable-next-line
export type NextIronHandler<T> = (...args: any[]) => Promise<T>;

export type UserSession = {
    id: string;
    token: string;
};

// eslint-disable-next-line
export function withSession<T>(handler: NextIronHandler<T>): (...args: any[]) => Promise<T> {
    return withIronSession(handler, sessionConfig);
}

export type GetServerSidePropsWithAuthContext = GetServerSidePropsContext & { userSession?: UserSession };
export function withAuthGetServerSideProps<T>(
    handler: NextIronHandler<T>,
    config?: {
        redirectIfNotLogged?: boolean;
    }
): (arg: { req: NextIronRequest; res: NextApiResponse }) => Promise<T> {
    // eslint-disable-next-line
    return withIronSession((args: any) => {
        const { req, res } = args;
        const user = req.session.get('user');
        if (
            user === undefined &&
            (config === undefined || config.redirectIfNotLogged === undefined || config.redirectIfNotLogged)
        ) {
            res.setHeader('location', '/login');
            res.statusCode = 302;
            res.end();
        } else {
            args.userSession = user;
            return handler(args);
        }
    }, sessionConfig);
}

export function logout(redirectTo?: string): Promise<void> {
    return new Promise((resolve) => {
        fetch('/api/logout', {
            method: 'POST',
        }).finally(() => {
            if (typeof window !== 'undefined') {
                window.localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
                window.location.href = redirectTo || getRouteSource(routes.LOGIN);
            }
            resolve();
        });
    });
}
