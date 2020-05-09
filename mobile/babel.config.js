module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-proposal-decorators', {legacy: true}],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json'
        ],
        alias: {
          '@components': './src/components',
          '@native-components': './src/native-components',
          '@localization': './src/localization',
          '@types': './src/types',
          '@providers': './src/providers',
          '@stores': './src/stores',
          '@utils': './src/utils',
          '@screens': './src/screens',
          '@icons': './src/icons'
        }
      }
    ]
  ]
}
