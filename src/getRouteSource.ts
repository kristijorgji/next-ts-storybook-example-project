import routes from '../routes';
import { i18n } from 'next-i18next';
import { UrlObject } from 'url';

export const getRouteSource = (
    name: string | UrlObject,
    // @ts-ignore
    language: string = i18n?.language || global.locale
): string => {
    if (language === undefined) {
        throw new Error('Routing - Language is undefined');
    }

    let error;
    if (typeof name === 'string') {
        name = transformParametrizedPath(name);
        // @ts-ignore
        if (!Object.prototype.hasOwnProperty.call(routes[language], name)) {
            error = {
                code: 'not_found',
                message: `Routing - Language ${language} does not have route with name ${name}`,
            };
        } else {
            // @ts-ignore
            return routes[language][name].source as string;
        }
    } else {
        const normalizedPathName = transformParametrizedPath(name.pathname as string);
        // @ts-ignore
        if (!Object.prototype.hasOwnProperty.call(routes[language], normalizedPathName)) {
            error = {
                code: 'not_found',
                message: `Routing - Language ${language} does not have route with name ${normalizedPathName}`,
            };
        } else {
            return formPath({
                ...name,
                // @ts-ignore
                pathname: routes[language][normalizedPathName].source as string,
            });
        }
    }

    throw new Error(JSON.stringify(error));
};

export function formPath(route: UrlObject): string {
    let r = route.pathname as string;

    const pattern = /:([^:/]+)/g;
    const urlTokens = [];

    let match = null;
    while ((match = pattern.exec(r))) {
        urlTokens.push(match[1]);
    }
    const params = JSON.parse(JSON.stringify(route.query)) as Record<string, string>;
    for (const paramKey of urlTokens) {
        // @ts-ignore
        r = r.replace(`:${paramKey}`, params[paramKey]);
        delete params[paramKey];
    }

    return addOrUpdateUrlQueryParameters(r, params);
}

export function transformParametrizedPath(path: string): string {
    const pattern = /\[([^\]/]+)/g;
    const urlTokens = [];

    let match = null;
    while ((match = pattern.exec(path))) {
        urlTokens.push(match[1]);
    }

    for (const paramKey of urlTokens) {
        // @ts-ignore
        path = path.replace(`[${paramKey}]`, `:${paramKey}`);
    }

    return path;
}

function addOrUpdateUrlQueryParameter(uri: string, key: string, value: string): string {
    const i = uri.indexOf('#');
    const hash = i === -1 ? '' : uri.substr(i);
    uri = i === -1 ? uri : uri.substr(0, i);
    const encodedValue = encodeURI(value);

    const re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    const separator = uri.indexOf('?') !== -1 ? '&' : '?';

    if (!encodedValue) {
        // remove key-value pair if value is empty
        uri = uri.replace(new RegExp('([?&]?)' + key + '=[^&]*', 'i'), '');
        if (uri.slice(-1) === '?') {
            uri = uri.slice(0, -1);
        }
        // replace first occurrence of & by ? if no ? is present
        if (uri.indexOf('?') === -1) {
            uri = uri.replace(/&/, '?');
        }
    } else if (uri.match(re)) {
        uri = uri.replace(re, '$1' + key + '=' + encodedValue + '$2');
    } else {
        uri = uri + separator + key + '=' + encodedValue;
    }
    return uri + hash;
}

function addOrUpdateUrlQueryParameters(uri: string, paramsMap: Record<string, string>) {
    let newUri = uri;
    for (const key in paramsMap) {
        newUri = addOrUpdateUrlQueryParameter(newUri, key, paramsMap[key]);
    }
    return newUri;
}
