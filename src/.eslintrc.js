module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'jsx-a11y', 'react', 'react-hooks'],
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
