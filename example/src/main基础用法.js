import React from "react"; //React必须大小
import ReactDOM from "react-dom"; //ReactDOM必须写成这样

//  第一个参数： 字符串类型的参数，表示要创建的标签的名称
//  第二个参数：对象类型的参数， 表示 创建的元素的属性节点
//  第三个参数： 子节点
//  从第3个参数开始：所有的后续参数都是 当前 虚拟DOM的 子节点
const myh1 = React.createElement("h1", { title: "ybo", id: "test" }, "content");

// 当节点无属性时，添加第二个参数为null
const mydiv = React.createElement("div", null, myh1, "div内部节点");

ReactDOM.render(mydiv, document.getElementById("app"));
