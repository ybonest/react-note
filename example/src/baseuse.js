import React from "react"  //React必须大小
import ReactDOM from "react-dom"  //ReactDOM必须写成这样

const myh1 = React.createElement("h1",{title:'ybo',id:"test"},"content");

ReactDOM.render(myh1,document.getElementById("app"))