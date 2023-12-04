module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: './tsconfig.json', // Path to your tsconfig.json
    },
    ignorePatterns: ['**/__tests__/**'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        // Add any other ESLint plugins or configurations you want to use
    ],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-extra-boolean-cast': 'off',
    },
};