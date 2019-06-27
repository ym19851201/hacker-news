const DEV_PORT = process.env.PORT || 3000;

module.exports = {
  entry: "./src/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "public/",
    port: DEV_PORT
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
//      {
//        test: /\.svg$/,
//        use: [
//          {
//            loader: "babel-loader",
//          },
//          {
//            loader: "react-svg-loader",
//            options: {
//              jsx: true
//            }
//          }
//        ],
//      }
    ]
  }
};
