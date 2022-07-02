module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    'max-len': ['error', { code: 150 }],
    'no-empty': ['error', { allowEmptyCatch: true }],
    'func-names': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'import/extensions': ['error', { ts: 'never' }],
    'object-curly-newline': ['error', { multiline: true }],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.ts'],
      },
    },
  },
};
