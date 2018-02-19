const path = require('path'); // для единообразного пути к файлам на разных платформах
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};

// общий код для пролдакшена и разработки
const common = {
  //точка входа приложения (не используется другими модулями)
  entry: {
    'index': PATHS.source + '/pages/index/index.js',
    'blog': PATHS.source + '/pages/blog/blog.js'
  },
  output: { // результат работы webpack
    path: PATHS.build,
      filename: '[name].js' // автоматически подставляются имена точек входа
  },
  plugins: [
    new HtmlWebpackPlugin({ // создает html файл с заданным title
      filename: 'index.html', // выходной файл
      chunks: ['index'],
      template: PATHS.source + '/pages/index/index.pug'
    }),
    new HtmlWebpackPlugin({ // создает html файл с заданным title
      filename: 'blog.html', // выходной файл
      chunks: ['blog'],
      template: PATHS.source + '/pages/blog/blog.pug'
    })
  ],
  module: {
    rules: [
      {
        test: /\.pug$/, // работа идет только с файлами с расширением pug
        loader: 'pug-loader',
        options: {
          pretty: true // расстановка отступов и переносов строк
        }
      }
    ]
  }
};

// код для разработки
const developmentConfig = {
  devServer: {
    stats: 'errors-only', // теперь в кончоль выводятся только ошибки
    port: 9000
  }
};

module.exports = function(env) {
  if (env === 'production') {
    return common;
  }
  if (env === 'development') {
    // Функция Object.assign получает список объектов и копирует в первый объект свойства из остальных.
    return Object.assign(
      {}, // копирование в пустой объект свойств их объектов common и developmentConfig
      common,
      developmentConfig
    )
  }
};

