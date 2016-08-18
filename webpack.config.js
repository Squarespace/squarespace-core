var webpack = require('webpack');
var pkg = require('./package.json');
var path = require('path');
var minified = isMinified();

module.exports = {
  entry: './src/index.js',
  output: {
    filename:
      pkg.name +
      '-' +
      pkg.version +
      (minified ? '.min' : '') +
      '.js',
    library: 'SQS',
    libraryTarget: 'umd',
    path: __dirname + '/build/' + pkg.version
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  resolveLoader: {
    modulesDirectories: [
      path.resolve(__dirname, 'node_modules')
    ]
  }
};

function isMinified() {
  var anyFlag = false;
  ['-p', '--optimize-minimize'].forEach(function(flag) {
    anyFlag = anyFlag || invokedWithFlag(flag);
  });
  return anyFlag;
}

function invokedWithFlag(flag) {
  return process.argv.indexOf(flag) === -1 ? false : true;
}