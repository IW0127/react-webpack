const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let FaviconsWebpackPlugin = require("favicons-webpack-plugin");
var favicons = require("favicons"),
  source = "./public/img/logo.png", // Source image(s). `string`, `buffer` or array of `string`
  configuration = {
    path: "/", // Path for overriding default icons path. `string`
    dir: "auto", // Primary text direction for name, short_name, and description
    lang: "en-US", // Primary language for name and short_name
    background: "#fff", // Background colour for flattened icons. `string`
    theme_color: "#fff", // Theme color user for example in Android's task switcher. `string`
    scope: "/", // set of URLs that the browser considers within your app
    version: "1.0", // Your application's version string. `string`
    icons: {
      favicons: true,
    },
  },
  callback = function (error, response) {
    if (error) {
      console.log(error.message); // Error description e.g. "An unknown error has occurred"
      return;
    }
    console.log(response.images); // Array of { name: string, contents: <buffer> }
    console.log(response.files); // Array of { name: string, contents: <string> }
    console.log(response.html); // Array of strings (html elements)
  };

favicons(source, configuration, callback);
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "assets/js/bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.(s*)css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: false,
              name: "assets/img/[name]-[hash:8].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
    }),
    new FaviconsWebpackPlugin("./public/img/logo.png"),
    new MiniCssExtractPlugin({
      filename: "assets/css/[name].css",
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"),
    compress: true,
    port: 3001,
    open: true,
    historyApiFallback: true,
  },
};
