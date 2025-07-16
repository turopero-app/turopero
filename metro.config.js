const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

try {
  config.resolver.extraNodeModules = {
    ...config.resolver.extraNodeModules,
    tslib: require.resolve('tslib'),
  };
} catch (e) {
  console.warn('⚠️ tslib no encontrada, continuando sin alias explícito');
}

module.exports = config;
module.exports = withNativeWind(config, { input: './global.css' });