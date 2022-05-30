module.exports = {
  extends: ['@kronbergerspiele/clutterfree'],
  plugins: ['baseui', 'react-hooks'],
  rules: {
    'baseui/deprecated-theme-api': 'warn',
    'baseui/deprecated-component-api': 'warn',
    'baseui/no-deep-imports': 'warn',
    'multiline-ternary': 'off',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}
