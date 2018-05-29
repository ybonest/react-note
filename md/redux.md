### redux介绍
- `redux`状态管理工具，通俗来讲就是数据池，存放着业务数据，便于数据共享，本质上`redux`所形成的是一个顶层为`state`的单一对象树。
- `state`对象树是只读的，也就是说你不能直接通过操作对象的方式改变`state`树的值，而必须通过`redux`提供的`dispatch action`携带要对应的数据通知`redux`提供的`reducer`。

一个`state`状态树大致模样如下：

```js
{
  person:[
    {name:'Tom', age: '22', gender: 'boy'},
    {name:'Xixi', age: '23', gender: 'girl'}
  ]
  animal:[
    'pig',
    'fish',
    'cat',
    'dog'
  ]
}
```

### redux三大核心
#### 1. action
`action`就是一个包含`type`属性的对象，除了`type`属性外，其他属性你可以任意定义，而`type`属性所对应的值是一个唯一的ID值，通常是大写的字符串常量，通过`type`，`reducer`就可以知道你要变化的`state`对象树下的那个分支。

`action`大致模样如下：

```
{
  type: 'FETCH_DATA',
  text: 'hello redux'
}
```

或者你可以通过函数返回一个`action`对象，以便动态存储

```js
function(value){
  return {
    type: 'FETCH_DATA',
    text: value
  }
}
```

通常情况下项目中的`type`所对应的值会被提取出来，放在一个文件中统一管理

```js
// actionTypes.js文件
export default {
  FETCH_DATA:'FETCH_DATA',
  GET_TREE:'GET_TREE'
}

// actions.js文件
import actionTypes from 'actionTypes.js'
export const fetchData = {
  type: actionTypes.FETCH_DATA,
  text: 'hello redux'
}
```

#### 2. reducer
`reducer`通常决定了`state`树的数据结构与`state`变化，它是一个纯函数，有两个参数：旧状态的`state`和`action`。(这里的`action`就是上一节中所介绍的`action`，而`action`如何触发`reducer`改变`state`状态将在下一节的`store`中介绍。)

通常`reducer`函数模样如下：

```js
function dataApp(state={},action){
  switch(action.type){
    case 'FETCH_DATA':
      return Object.assign({},state,{
        todo: action.text
      })
      break;
    case 'GET_DATA':
      return Object.assign({},state,{
        good: action.text
      })
      break;
    default:
      return state
  }
}
```
通过上面的`reducer`例子可以看到，reducer中必然是要返回一个新状态的`state`，而且值得注意的是：**`reducer`中不允许直接改变state，而是需要创建一个副本，在副本中改变对应的值后再`return`**。  

实际开发中，项目的`action type`会越来越多，若所有的`action`都放在一个`reducer`函数中处理，会导致这个函数越来越庞大，所以`redux`提供了`reducer`拆分的功能，这个功能由`combineReducers`函数实现。  

`combineReducers`函数使用如下：

```js
import { combineReducers } from 'redux';

function todos(state=[], action){
  switch(action.type){
    case ADD_TODO:
      // do something
      return newState; // 返回新的state
    case TOGGLE_TODO:
      // do something
      return newState;
    default:
      return state;
  }
}

function visibilityFilter(state=SHOW_ALL,action){
  switch (action.type) {
  case SET_VISIBILITY_FILTER:
    return action.filter
  default:
    return state
  }
}

// 使用combineReducers合并reducer
const todoApp = combineReducers({
  visibilityFilter,
  todos
})
```

使用`combineReducers`合并后`state`结构大致如下：

```js
{
  todos: […………],
  visibilityFilter: '',
}
```

我们还可以通过为`combineReducers`函数的参数对象配置新的键来修改`state`结构的键

```js
const todoApp = combineReducers({
  a: visibilityFilter,
  b: todos
})
```

这样`state`结构大致变成如下模样：

```js
{
  a: [],  // 对应todos
  b: ''   // 对应visibilityFilter
}
```

接下来我们来模拟一下`combineReducers`函数

```js
function todoApp(state = [], action){
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
```

**注意每个`reducer`只负责`state`中的一部分，因此拆分后需要将对应的`state`部分传给对应的`reducer`,当然如果你使用`redux`提供的`combineReducers`函数则不用考虑这些，它会自动分配**

### 3. store
`store`的作用就是将`reducer`和`action`关联起来，Store有如下职责：  
- 维持应用的 state
- 提供`getState()`方法获取state
- 提供`dispatch(action)`方法更新state
- 通过`subscribe(listener)`注册监听器
- 通过`unsubscribe(listener)`注销监听，**注意此处的unsubscribe是上面注册监听器时返回的函数**  

store使用如下：

```js
import { createStore } from 'redux';
import todoApp from './reducers'; //此处是reducer
let store = createStore(todoApp)
```

`createStore`函数第二个参数可选，用来设置`state`的初始状态

```js
let store = createStore(todoApp, {})
```

当创建`store`后，就可以用`dispatch`,通知`reducer`，从而触发`state`变化

```js
store.dispatch({type:'NO_SHOW',filter:'hide'})
```

下面是一个完整的例子：

```js
// import { combineReducers, createStore } from 'redux';
//若不套入页面，可以直接用node方式引入，直接终端使用node启动此js文件测试
const {combineReducers, createStore} = require('redux');

// reducer
function todoApp(state = {num:0}, action){
  let copyState = JSON.parse(JSON.stringify(state));
  switch(action.type){
    case "ADD_ACTION":
      copyState.num++;
      return copyState;
    case "SUB_ACTION":
      copyState.num--;
      return copyState;
    default:
      return copyState;
  }
}

function visibilityApp(state='NO_SHOW', action){
  switch(action.type){
    case 'SHOW_ACTION':
      return action.filter;
    case 'NO_SHOW':
      return action.filter;
    default:
      return state;
  }
}

const reducer = combineReducers({
  todoApp,
  visibilityApp
})

// store
const store =  createStore(reducer);

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
subscribe()
```