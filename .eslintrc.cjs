module.exports = {
  extends: ['react-app', 'eslint:recommended'],
  plugins: ['prettier', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['**/*.json'],
  rules: {
    'prettier/prettier': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-unused-vars': 'off',
  },
}
