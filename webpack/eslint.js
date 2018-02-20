module.exports = function(){
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "eslint-loader",
          options: {
            // eslint options (if necessary)
          }
        }
      ]
    }
  }
};