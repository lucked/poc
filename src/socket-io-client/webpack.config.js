'use strict';

module.exports = [{
  module: {
    loaders: [
      {
        test: [/\.jsx$/],
        loaders: ["jsx-loader?insertPragma=React.DOM&harmony"],
      }
    ],
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