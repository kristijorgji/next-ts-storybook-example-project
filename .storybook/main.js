const path = require("path");

module.exports = {
    stories: ["../components/**/*.stories.tsx"],
    presets: [path.resolve(__dirname, "./next-preset.js")],
};
