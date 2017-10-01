'use strict';

var APP_DIR = path.resolve(__dirname, 'src');

module.exports = [{
  module: {
    loaders: [
      {
        test: [/\.jsx$/],
        loaders: ["jsx-loader?insertPragma=React.DOM&harmony"],
      }
    ],
  },
  resolve: {
      alias: {
          "ag-grid-root" : __dirname + "/node_modules/ag-grid"
      },
      extensions: ['', '.js', '.jsx']
  },
  externals: {
    //don't bundle the 'react' npm package with our bundle.js
    //but get it from a global 'React' variable
    'react': 'React',
    'react-dom': 'ReactDOM'
  },
  plugins: [
    new webpack.ProvidePlugin({
    'React': 'react',
    'ReactDOM': 'react-dom'
    })
    ]
}];