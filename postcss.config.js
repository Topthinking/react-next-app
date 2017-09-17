module.exports = {
    plugins: [
      require('postcss-cssnext')({
        warnForDuplicates: false
      }),
      require('postcss-modules')({
        generateScopedName: '[name]__[local]___[hash:base64:5]]'
      }),
      require('cssnano')()
    ]
  }
  