const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  module: {
    rules: [ 
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      // { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html' })
  ]
}