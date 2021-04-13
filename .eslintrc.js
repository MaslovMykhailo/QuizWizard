module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'import',
    'prettier'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    'import/order': [
      'error',
      {
          'newlines-between': 'always'
      }
    ],
    'comma-dangle': [
      'error', {
        'arrays': 'never',
        'objects': 'never',
        'imports': 'never',
        'exports': 'never',
        'functions': 'never'
      }
    ],
    'semi': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'no-multiple-empty-lines': ['error', {max: 1}],
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  overrides: [
    {
        files: ['*.eslintrc.js'],
        rules: {
            'no-undef': 'off',
            '@typescript-eslint/no-var-requires': 'off'
        }
    }
  ]
}