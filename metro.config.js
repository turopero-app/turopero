const { getDefaultConfig } = require('expo/metro-config');

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
