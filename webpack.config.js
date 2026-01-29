const path = require("path");
const GasPlugin = require("gas-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  mode: "development",
  devtool: false,

  output: {
    path: path.join(__dirname, "dist"),
    filename: 'bundle.js',
  },

  resolve: {
    modules: [
      path.resolve('./src'),
      "node_modules",
    ],
    extensions: [".ts", ".js"],
  },

  plugins: [
    new GasPlugin({
      autoGlobalExportsFiles: ['**/*.ts'],
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/ui/*.html', to: '[name][ext]' },
      ],
    }),
  ],
};
