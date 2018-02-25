import React from "react"; //React必须大小
import ReactDOM from "react-dom"; //ReactDOM必须写成这样

//jsx语法浏览器不识别，需要利用webpack的loader对jsx语法进行编译
const mydiv = <div>使用jsx语法</div>

ReactDOM.render(mydiv, document.getElementById("app"));
