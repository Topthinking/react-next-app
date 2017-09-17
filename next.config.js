const fs = require('fs')
const trash = require('trash')

const cdn = ''
module.exports = {
  exportPathMap: function () {
    return {
      '/about': { page: '/about' }
    }
  },
  webpack: (config, { dev }) => {
    config.plugins = config.plugins.filter(
      (plugin) => (plugin.constructor.name !== 'UglifyJsPlugin')
    )

    config.module.rules.push(
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]'
            }
          },
          {
            loader: 'skeleton-loader',
            options: {
              procedure: function (content) {
                const fileName = `${this._module.userRequest}.json`
                const classNames = fs.readFileSync(fileName, 'utf8')

                // 正则匹配 url("../../static")
                var regContent = content.replace(/(url\((["|'|]?)(\.|\/)+static\/)/g, function (match) {
                  var _prefix
                  match.replace(/(url\(["|']?)/g, function (_match) {
                    _prefix = _match
                  })
                  if (cdn === '') {
                    return _prefix + '../static/'
                  } else {
                    return _prefix + cdn + '/static/'
                  }
                })

                content = regContent

                trash(fileName)

                return ['module.exports = {',
                  `classNames: ${classNames},`,
                  `stylesheet: \`${content}\``,
                  '}'
                ].join('')
              }
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    )

    return config
  },
  webpackDevMiddleware: (config) => {
    return config
  }
}
