import React from "react"; //React必须大小
import ReactDOM from "react-dom"; //ReactDOM必须写成这样

//jsx语法浏览器不识别，需要利用webpack的loader对jsx语法进行编译
/**
 *  步骤 
 * 一、安装babel
 * 1、安装babel依赖：执行npm i babel-core babel-loader babel-plugin-transform-runtime -D
 * 2、安装babel语法：执行npm i babel-preset-env babel-preset-stage-0 -D
 * 3、安装react语法：执行npm i babel-preset-react -D
 * 二、添加 .babelrc文件，配置如下
 * {
 *  "presets":["env","stage-0","react"],
 *  "plugins":["transform-runtime"]
 * }
 * 三、webpack.config.js中添加babel-loader配置
 * {test:/\.js|jsx$/,use:"babel-loader",exclude:/node_modules/}
 */
const mydiv = <div>使用jsx语法</div>

ReactDOM.render(mydiv, document.getElementById("app"));
