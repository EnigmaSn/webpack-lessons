module.exports = function (paths) {
  return {
    module: {
      rules: [
        {
          test: /\.scss$/,
          include: paths,
          use: [
            'style-loader', // добавляет стили в дом дерево при помощи тега <style>
            'css-loader', // добавляет css модули в зависимости
            'sass-loader' // компилируется scss в css
          ]
        }
      ]
    }
  }
};