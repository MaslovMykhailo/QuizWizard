const MetroConfig = require('@ui-kitten/metro-config')
const evaConfig = {evaPackage: '@eva-design/material'}
module.exports = MetroConfig.create(evaConfig, {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false
      }
    })
  }
})
