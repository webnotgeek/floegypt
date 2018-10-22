const webpack = require("webpack");
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const extractPlugin = new ExtractTextPlugin({
  filename: "./assets/css/app.css"
});

const config = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: {
    // tether: 'tether',
    app: "./app.js"
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "./assets/js/[name].bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      //babel-loader
      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      },
      //html-loader
      { test: /\.html$/, use: ["html-loader"] },
      //sass-loader
      {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "src", "assets", "scss")],
        use: extractPlugin.extract({
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true
              }
            },
            {
              loader: "resolve-url-loader",
              options: {
                root: "/"
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: "style-loader"
        })
      },
      //file loader
      //file-loader(for images)
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./assets/media/"
            }
          }
        ]
      },
      //file-loader(for fonts)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["file-loader"]
      },
      // Bootstrap 4
      {
        test: /bootstrap\/dist\/js\/umd\//,
        use: "imports-loader?jQuery=jquery"
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html"
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: "contact-us.html",
      template: "contact-us.html"
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: "about-us.html",
      template: "about-us.html"
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: "careers.html",
      template: "careers.html"
    }),
    new HtmlWebpackPlugin({
      // Also generate a test.html
      filename: "product.html",
      template: "product.html"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      tether: "tether",
      Tether: "tether",
      "window.Tether": "tether",
      Popper: ["popper.js", "default"],
      "window.Tether": "tether",
      Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
      Button: "exports-loader?Button!bootstrap/js/dist/button",
      Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
      Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
      Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
      Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
      Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
      Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
      Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
      Util: "exports-loader?Util!bootstrap/js/dist/util"
    }),
    extractPlugin
  ],

  devServer: {
    compress: true,
    port: 12000,
    stats: "errors-only",
    open: true
  },

  devtool: "inline-source-map"
};

module.exports = config;
