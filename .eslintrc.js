module.exports = {
  extends: ['@kronbergerspiele/clutterfree'],
  plugins: ['baseui'],
  rules: {
    'baseui/deprecated-theme-api': 'warn',
    'baseui/deprecated-component-api': 'warn',
    'baseui/no-deep-imports': 'warn',
    'multiline-ternary': 'off',
  },
}
