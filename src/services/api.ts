import { STORAGE_KEYS } from './storage';
import { i18n } from 'next-i18next';
import { DEFAULT_LOCALE } from '../constants';
import { logout } from '../utils/auth';

type FetchFn = (input: RequestInfo, init?: RequestInit) => Promise<Response>;

function fetchAbsolute(fetch: FetchFn, baseUrl: string): (input: RequestInfo, init?: RequestInit) => Promise<Response> {
    return async (input: RequestInfo, init?: RequestInit) => {
        const headers: Record<string, string> = {
            'Accept-Language': _getCurrentLocale(),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        if (
            typeof window !== 'undefined' &&
            window &&
            window.localStorage &&
            (init === undefined || init.method !== 'Origin')
        ) {
            headers['Authorization'] = `Bearer ${window.localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)}`;
        }
        const response = await fetch(baseUrl + input, {
            headers: headers,
            ...init,
        });

        if (response.status === 401) {
            await logout();
        }

        return response;
    };
}

function _getCurrentLocale(): string {
    return (i18n && i18n.language) || DEFAULT_LOCALE;
}

export const request = fetchAbsolute(fetch, process.env.NEXT_PUBLIC_API_BASE_PATH as string);

export function isApiLoggedIn(): boolean {
    return typeof window !== 'undefined' && window && window.localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) !== null;
}
