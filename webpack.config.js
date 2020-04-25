const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    // Fixes the refresh problem
    publicPath: '/'
  },
  module: {
    rules: [ 
      // Initialising the babel loader
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      // { test: /\.html$/, loader: 'html-loader' },
      // Initialising the css loader to allow css files to be used
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve('src'),
    watchContentBase: true,
    // Tells webpack what server to run on
    port: 4000,
    // Fixes the refresh problem
    historyApiFallback: true,
    // Allow hot reloading
    hot: true,
    // Opens the browser after server had been  
    open: true,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  plugins: [
    // Points at the html file
    new HtmlWebpackPlugin({ template: './src/index.html', filename: 'index.html' })
  ]
}