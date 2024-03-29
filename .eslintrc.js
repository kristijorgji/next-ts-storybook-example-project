module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: { jsx: true },
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',

        // Prettier plugin and recommended rules
        'plugin:prettier/recommended',
    ],
    rules: {
        // Include .prettierrc.js rules
        'prettier/prettier': ['error', {}, { usePrettierrc: true }],

        'react/prop-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
    },
    settings: {
        'import/extensions': ['.js', '.jsx', '.tsx', '.ts'],
    },
};
