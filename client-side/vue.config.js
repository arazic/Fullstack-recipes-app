module.exports = {
  configureWebpack: {
    devtool: "source-map"
  },
  devServer: {
    host: "localhost",
    port: 8081

  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
