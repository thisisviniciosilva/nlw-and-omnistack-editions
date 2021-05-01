module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 11,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'no-unused-vars': 'off',
    'arrow-parens': 'off',
    'comma-dangle': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'implicit-arrow-linebreak': 'off',
    'function-paren-newline': 'off',
  },
};
