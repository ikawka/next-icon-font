const cssLoaderConfig = require('@zeit/next-css/css-loader-config')
const IconFontPlugin = require('icon-font-loader').Plugin

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      if (!options.defaultLoaders) {
        throw new Error(
          'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade'
        )
      }

      const { dev, isServer } = options
      const {
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
      } = nextConfig

      options.defaultLoaders.iconfont = cssLoaderConfig(config, {
        extensions: ['scss'],
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'icon-font-loader', 
            options: { fallback: 'style-loader' },
          },
          { loader: 'sass-loader' },
        ],
      })

      config.module.rules.push(
        {
          test: /\.[s]?css$/,
          use: options.defaultLoaders.iconfont
        },
      )
      config.plugins = config.plugins || []
      config.plugins.push(new IconFontPlugin())

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
