const { i18n } = require('./next-i18next.config');
const routes = require('./routes');

/** @type {import('next/dist/server/config').NextConfig} */
module.exports = {
    reactStrictMode: true,
    i18n,
    rewrites: async () => [...Object.values(routes.en_US), ...Object.values(routes.de_DE)],
};
