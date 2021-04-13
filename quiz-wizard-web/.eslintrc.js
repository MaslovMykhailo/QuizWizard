
module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:jsx-a11y/recommended',
    '../.eslintrc.js'
  ],
  plugins: ['jsx-a11y'],
  rules: {
    'quotes': ['error', 'single'],
    'react/jsx-indent' : ['error', 2]
  }
}