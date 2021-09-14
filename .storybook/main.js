const path = require("path");

module.exports = {
    addons: [
        '@storybook/addon-actions',
        '@storybook/addon-viewport',
    ],
    stories: ["../src/components/**/*.stories.tsx"],
    presets: [path.resolve(__dirname, "./next-preset.js")],
};
