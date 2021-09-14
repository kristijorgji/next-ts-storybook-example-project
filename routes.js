const routes = {
    INDEX: '/',
    LOGIN: '/login',
    PROFILE: '/profile',
};

const enRoutes = Object.keys(routes).reduce((previousValue, rk) => {
    const path = routes[rk];
    previousValue[path] = {
        source: path,
        destination: path,
        locale: false,
    };
    return previousValue;
}, {});

function localizedRoute(locale) {
    return (path, destination) => ({
        [destination || path]: {
            source: `/${locale}${path}`,
            destination: destination || path,
            locale: false,
        },
    });
}

/**
 * Order of routes is important, first after generic route add /create, then /:id and so on
 */

const deRouteMaker = localizedRoute('de_DE');
const deRoutes = {
    ...deRouteMaker('/'),
    ...deRouteMaker('/anmelden', routes.LOGIN),

    ...deRouteMaker('/profil', routes.PROFILE),
};

module.exports = {
    routes: routes,
    en_US: enRoutes,
    de_DE: deRoutes,
};
