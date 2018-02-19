const path = require('path'); // для единообразного пути к файлам на разных платформах
const HtmlWebpackPlugin = require('html-webpack-plugin');

// merge собирает модули в один конфиг
const merge = require('webpack-merge');
const pug = require('./webpack/pug'); // можно не указывать расширение
const devserver = require('./webpack/devserver'); // можно не указывать расширение
const sass = require('./webpack/sass');
const css = require('./webpack/css');

const PATHS = {
  source: path.join(__dirname, 'source'),
  build: path.join(__dirname, 'build')
};

// общий код для пролдакшена и разработки
const common = merge([
  {
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
    ]
  },
  pug() // круглые скобки, чтобы функция модуля вернула необходимый объект
]);

module.exports = function(env) {
  if (env === 'production') {
    return common;
  }
  if (env === 'development') {
    // Функция Object.assign получает список объектов и копирует в первый объект свойства из остальных. [удалено]

    // в webpack-merge передается массив объектов, который нужно склеить
    return merge ([
      common,
      devserver(), // круглые скобки, чтобы функция модуля вернула необходимый объект
      sass(),
      css()
    ])
  }
};

