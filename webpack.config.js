const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const DotEnv = require('dotenv-webpack')


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    // path: path.resolve('dist'),
    path: __dirname,
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
      '/api': {
        target: 'http://localhost:8000',
        secure: false
      }
    }
  },
  plugins: [
    new DotEnv(),
    // Points at the html file
    new HtmlWebpackPlugin({ 
      template: './src/index.html', 
      filename: 'index.html', 
      favicon: './src/assets/favicon-32x32.png'
    })
  ]
}