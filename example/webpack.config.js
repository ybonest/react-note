const path = require("path");
const HtmlPlugin = require("html-webpack-plugin"); // 导入 在内存中创建页面的 插件，得到的 是一个构造函数

const htmlPlguin = new HtmlPlugin({
  template: path.join(__dirname, "./src/index.html"), // 指定要托管哪个页面
  filename: "index.html" // 生成的页面名称
});

module.exports = {
  entry: path.join(__dirname, "./src/main.js"), // 入口
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "bundle.js"
  },
  plugins: [htmlPlguin],
  module: {
    rules: [{ test: /\.js|jsx$/, use: "babel-loader", exclude: /node_modules/ }]
  }
};
