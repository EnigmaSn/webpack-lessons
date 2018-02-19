module.exports = function () {
  return {
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
  }
};