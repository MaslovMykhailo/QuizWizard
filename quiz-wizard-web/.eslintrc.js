module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:jsx-a11y/recommended',
    'plugin:react/recommended',
    'prettier',
    '../.eslintrc.js'
  ],
  plugins: ['jsx-a11y', 'react-hooks'],
  rules: {
    'quotes': ['error', 'single'],
    'react/jsx-indent' : ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-children-prop': 'off',
    'react/jsx-first-prop-new-line': 'error',
    'react/jsx-max-props-per-line': 'error',
    'react/self-closing-comp': 'error',
    'react/jsx-closing-bracket-location': 'error',
    'react/jsx-wrap-multilines': [
      'error',
      {
        declaration: 'parens-new-line',
        assignment: 'parens-new-line',
        return: 'parens-new-line',
        arrow: 'parens-new-line',
        condition: 'parens-new-line',
        logical: 'parens-new-line',
        prop: 'ignore'
      }
    ],
    'react/jsx-one-expression-per-line': [
      'error',
      {
        allow: 'single-child'
      }
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'jsx-a11y/no-autofocus': 'off'
  }
}
