const ExtractTextPlugin = require('extract-text-webpack-plugin');

// ExtractTextPlugin заменяет style-loader, если не сработает то применяется fallback, т.е. style-loader

module.exports = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: paths,
          use: ExtractTextPlugin.extract({
            publicPath: '../', // чтобы пути к изображениеям в css были правильными
            fallback: 'style-loader',
            use: [
              // 'css-loader',
              // 'sass-loader'

              {
                loader: 'css-loader',
                options: {
                  minimize: true
                }
              },
              {
                loader: 'sass-loader'
              }
            ]
          })
        },
        {
          test: /\.css$/,
          include: paths,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('./css/[name].css')
    ]
  }
};