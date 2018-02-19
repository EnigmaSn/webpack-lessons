module.exports = function (paths) {
  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include: paths,
          use: [
            'style-loader', // добавляет стили в дом дерево при помощи тега <style>
            'css-loader' // добавляет css модули в зависимости
          ]
        }
      ]
    }
  }
};