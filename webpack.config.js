const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, options) => {
  const config = {
    mode: "development",
    entry: ["./src/index.js", "./src/style/style.scss"],
    output: {
      path: path.resolve(__dirname + "/dist"),
      publicPath: "/",
      filename: "bundle.js",
      clean: true,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(jpg|png|gif|svg)$/,
          loader: "image-webpack-loader",
          enforce: "pre",
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
        },
        {
          test: require.resolve("jquery"),
          loader: "expose-loader",
          options: {
            exposes: ["$", "jQuery"],
          },
        },
      ],
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "dist")
      },
    },
  };
  return config;
};
