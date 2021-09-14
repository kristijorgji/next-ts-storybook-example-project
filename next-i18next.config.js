const path = require('path');

module.exports = {
    localePath: path.resolve('./public/static/locales'),
    i18n: {
        defaultLocale: 'en_US',
        locales: ['en_US', 'de_DE'],
    },
};
