import React from "react"; //React必须大小
import ReactDOM from "react-dom"; //ReactDOM必须写成这样

 /**
  * 使用构造函数创建组件
  * 注意事项：
  *  1、构造函数中必须返回对应的html标签元素或者返回null，否则报错
  *     Uncaught Error: Hello(...): Nothing was returned from render. 
  *     This usually means a return statement is missing. Or, to render nothing, return null.
  *  2、要创建一个组件的话，组件的首字母必须大写
  */
function Hello(props){  //构造函数中使用形参接受传来的参数，并且props上得数据只读，不可写
  console.log(props);
 
  return <div>
    <h3>用户名：{props.username}</h3>
    <h3>年龄：{props.age}</h3>
    <h3>性别：{props.gender}</h3>
  </div>
}
const data = {
  username:'ybo-1',
  age:3,
  gender:'男-1'
}
const mydiv = <div>
  {/*组件传参一：普通传参（若参数为数字，用{}包裹对应的数字即可）*/}
  <h2 style={{color:'pink'}}>组件传参一</h2>
  <Hello username="ybo" age={3} gender="男"></Hello>
  {/*组件传参二：使用es6扩展运算符*/}
  <h2 style={{color:'pink'}}>组件传参二</h2>
  <Hello {...data}></Hello>
</div>

ReactDOM.render(mydiv, document.getElementById("app"));
