module.exports = {
    parser: '@typescript-eslint/parser',

    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },

    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],

    env: {
        node: true,
        browser: true,
        es6: true
    },

    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier'],

    settings: {
        react: {
            version: 'detect'
        }
    },

    overrides: [
        {
            files: ['**/*.tsx?'],
            rules: {
                'react/prop-types': 'warn',
                'react/display-name': 'warn',
                'react/jsx-no-target-blank': 'warn',
                'consistent-type-assertions': 'off'
            }
        }
    ],

    rules: {
        'react/react-in-jsx-scope': 'off',
        'react/no-unescaped-entities': 'warn',
        'react/jsx-no-target-blank': [1, { allowReferrer: true }],
        '@typescript-eslint/no-unused-vars': ['error'],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/consistent-type-assertions': 'off',

        'prettier/prettier': ['error', {}, { usePrettierrc: true }],

        'no-console': [1, { allow: ['warn', 'error'] }]
    }
};
