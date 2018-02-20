const path = require('path'); // для единообразного пути к файлам на разных платформах
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// merge собирает модули в один конфиг
const merge = require('webpack-merge');
const pug = require('./webpack/pug'); // можно не указывать расширение
const devserver = require('./webpack/devserver'); // можно не указывать расширение
const sass = require('./webpack/sass');
const css = require('./webpack/css');
const extractCSS  = require('./webpack/css.extract');
const uglifyJS = require('./webpack/js.uglify');
const images = require('./webpack/images');
const optimizeCSS = require('./webpack/css.optimize');
const eslintJS = require('./webpack/eslint');

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
      filename: 'js/[name].js' // автоматически подставляются имена точек входа
    },
    plugins: [
      new HtmlWebpackPlugin({ // создает html файл с заданным title
        filename: 'index.html', // выходной файл
        chunks: ['index', 'common'],
        template: PATHS.source + '/pages/index/index.pug'
      }),
      new HtmlWebpackPlugin({ // создает html файл с заданным title
        filename: 'blog.html', // выходной файл
        chunks: ['blog', 'common'],
        template: PATHS.source + '/pages/blog/blog.pug'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common' // автоматически выносится в общий код для всех страниц
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  },
  pug(), // круглые скобки, чтобы функция модуля вернула необходимый объект
  images()
]);

module.exports = function(env) {
  if (env === 'production') {
    return merge([
      common,
      extractCSS(),
      eslintJS(),
      uglifyJS()
    ])
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

