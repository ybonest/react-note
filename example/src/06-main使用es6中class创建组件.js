import React from "react"; //React必须大小
import ReactDOM from "react-dom"; //ReactDOM必须写成这样

//引入组件
import Person from "./components/PersonClass.jsx";

const data = {
  name:'ybo',
  age:12,
  gender:"boy"
}

const mydiv = <div>
  <Person {...data}></Person>
</div>

ReactDOM.render(mydiv, document.getElementById("app"));
