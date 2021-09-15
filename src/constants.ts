export const DEFAULT_LOCALE = 'en_US';

export const sessionConfig = {
    cookieName: 'ssdls',
    password: process.env.SECRET_COOKIE_PASSWORD as string,
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600 * 24,
    },
};

export const LOCALE_COOKIE_NAME = 'NEXT_LOCALE';
