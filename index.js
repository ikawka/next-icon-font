const cssLoaderConfig = require('@zeit/next-css/css-loader-config')

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
        extensions: ['scss', 'sass', 'css'],
        cssModules,
        cssLoaderOptions,
        postcssLoaderOptions,
        dev,
        isServer,
        loaders: [
          {
            loader: 'icon-font-loader',
          },
        ],
      })

      config.module.rules.push(
        {
          test: /\.scss$/,
          use: options.defaultLoaders.iconfont
        },
        {
          test: /\.sass$/,
          use: options.defaultLoaders.iconfont
        }
      )

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    }
  })
}
