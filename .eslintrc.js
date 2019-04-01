module.exports = {
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module'
    },
    env: {
        'browser': true,
        'node': true
    },
    extends: [
        // 'plugin:vue/base',
        'eslint:recommended'
    ],
    rules: {
        'quotes': ['error', 'single'],
        // 'semi': ['error', 'always'],
        // 'no-console': 'error',
        // 'arrow-parens': 0,
    },
    overrides: [{
        'files': ['*.js'],
        'rules': {
            'indent': ['error', 4, {
                'SwitchCase': 1
            }],
        }
    }]
};