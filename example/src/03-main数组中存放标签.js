import React from "react"; //React必须大小
import ReactDOM from "react-dom"; //ReactDOM必须写成这样

const arr = [
  <div key="1">1111</div>,
  <div key="2">2222</div>,
  <div key="3">3333</div>,
  <div key="4">4444</div>
]

const mydiv = <div>
  {arr}
</div>

ReactDOM.render(mydiv, document.getElementById("app"));
