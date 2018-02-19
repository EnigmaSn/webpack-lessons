module.exports = function () {
  // возвращается объект, который затем
  // клеивается с остальной частью конфига
  // при помощи webpack-merge
  return {
    devServer: {
      stats: 'errors-only', // теперь в кончоль выводятся только ошибки
      port: 9000
    }
  }
};

