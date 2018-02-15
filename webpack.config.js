const path = require('path'); // для единообразного пути к файлам на разных платформах
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  entry: PATHS.source + '/index.js', //точка входа приложения (не используется другими модулями)
  output: { // результат работы webpack
    path: PATHS.build,
      filename: '[name].js' // автоматически подставляются имена точек входа
  },
  plugins: [
    new HtmlWebpackPlugin({ // создает html файл с заданным title
      title: 'Webpack app'
    })
  ]
};


