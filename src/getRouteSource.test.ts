import { UrlObject } from 'url';
import { formPath, transformParametrizedPath } from './getRouteSource';

describe('getRouteSource.formPath', () => {
    const cases: [string, UrlObject, string][] = [
        [
            'with_url_param_and_query_param',
            {
                pathname: '/superpage/:id',
                query: {
                    id: '23233223',
                    super: 222,
                },
            },
            '/superpage/23233223?super=222',
        ],
        [
            'with_two_url_param',
            {
                pathname: '/superpage/:id/:test/haha',
                query: {
                    id: '23233223',
                    test: 'mmmm',
                },
            },
            '/superpage/23233223/mmmm/haha',
        ],
        [
            'with_two_url_param_and_query_esc',
            {
                pathname: '/superpage/:id/:test/haha',
                query: {
                    id: '23233223',
                    test: 'mmmm',
                    specialone: 'dddd&2+212=',
                    inhouse: 'true',
                },
            },
            '/superpage/23233223/mmmm/haha?specialone=dddd&2+212=&inhouse=true',
        ],
    ];

    test.each<[string, UrlObject, string]>(cases)('%s', (_, path: UrlObject, expected: string) => {
        expect(formPath(path)).toEqual(expected);
    });
});

describe('getRouteSource.transformParametrizedPath', () => {
    const cases: [string, string, string][] = [
        ['with_one_param', '/routines/[id]', '/routines/:id'],
        ['with_two_params', '/routines/[id]/mmm/[test]', '/routines/:id/mmm/:test'],
        ['without_param', '/routines', '/routines'],
    ];

    test.each<[string, string, string]>(cases)('%s', (_, path: string, expected: string) => {
        expect(transformParametrizedPath(path)).toEqual(expected);
    });
});
