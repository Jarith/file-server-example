module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    plugins: [
        'import',
        'promise',
    ],
    extends: [
        'eslint:recommended',
        'airbnb-base',
        'plugin:import/recommended',
        'plugin:promise/recommended',
    ],
    parserOptions: {
        sourceType: 'module',
        impliedStrict: true,
    },
    rules: {
        indent: ['error', 4, { SwitchCase: 1 }],
        'import/prefer-default-export': 'off',
        'arrow-parens': ['error', 'as-needed'],
        'security/detect-object-injection': 'off',
        'no-underscore-dangle': 'off',
    },
};
