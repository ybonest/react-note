import React from "react"; //React必须大小
import ReactDOM from "react-dom"; //ReactDOM必须写成这样

import StateClass from "./components/StateClass.jsx"

const person = {
  name:'ybo',
  age:12,
  gender:"boy"
}

const stateClass = <StateClass {...person}></StateClass>
console.log(stateClass);
console.dir(React.Component);

const mydiv = <div>
  <StateClass {...person}></StateClass>
</div>

ReactDOM.render(mydiv, document.getElementById("app"));
