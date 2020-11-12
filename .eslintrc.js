module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'comma-dangle': 0,
    semi: 0,
    'no-undef': 0,
    'react/self-closing-comp': 0,
    'no-loop-func': 0,
    'no-param-reassign': 0,
    'import/newline-after-import': 0,
    'consistent-return': 0,
    'import/no-extraneous-dependencies': 0,
    '@typescript-eslint/lines-between-class-members': 0,
  },
};
