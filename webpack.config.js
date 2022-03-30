const path = require('path');

module.exports = {
  entry: {
    "angular-route": path.resolve(__dirname, './src/js/angular-route.js'),
    "angular": path.resolve(__dirname, './src/js/angular.js'),
    "app": path.resolve(__dirname, './src/js/app.js'),
    "controller": path.resolve(__dirname, './src/js/controllers/controller.js'),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'dist'),
  },
};