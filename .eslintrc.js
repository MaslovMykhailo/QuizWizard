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
    'quotes': ['error', 'single'],
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
    'no-multi-spaces': 'error',
    'no-trailing-spaces': 'error',
    'keyword-spacing': [2],
    'eol-last': ['error', 'always'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['TSTypeParameterInstantiation']
      }
    ]
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
