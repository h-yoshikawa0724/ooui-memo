module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'no-use-before-define': 'off',
    // Laravel UIの仕様上、React本体もDevDependenciesになる？のでオフ
    'import/no-extraneous-dependencies': 'off',
  },
  settings: {
    react: {
      version: '16.14.0',
    },
  },
};
