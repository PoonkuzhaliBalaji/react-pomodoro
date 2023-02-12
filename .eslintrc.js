module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true
  },
  extends: [],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['react'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state']
      }
    ]
  }
};
