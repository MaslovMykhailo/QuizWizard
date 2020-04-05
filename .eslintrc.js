module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'import', 'prettier'],
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
    'semi': ['error', 'never']
  }
};
