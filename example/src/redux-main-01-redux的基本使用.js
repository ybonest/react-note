import React from "react"; //React必须大小
import ReactDOM from "react-dom"; //ReactDOM必须写成这样
import store from './redux-components//02-redux-store.js'

const arr = [
  <div key="1">1111</div>,
  <div key="2">2222</div>,
  <div key="3">3333</div>,
  <div key="4">4444</div>
]

// 监听
const subscribe = store.subscribe(function(){
  console.log(store.getState())
});

// dispatch action

store.dispatch({type:'ADD_ACTION'})
store.dispatch({type:'SUB_ACTION'})
store.dispatch({type:'NO_SHOW',filter:'hide'})
store.dispatch({type:'SHOW_ACTION',filter:'show'})

// 注销监听
// subscribe()

const mydiv = <div>
  {arr}
</div>

ReactDOM.render(mydiv, document.getElementById("app"));
