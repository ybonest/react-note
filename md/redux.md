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
#### action
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

#### reducer
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
通过上面的`reducer`例子可以看到，reducer中必然是要返回一个新状态的`state`，而且值得注意的是：**`reducer`中不允许直接改变state，而是需要创建一个副本，在副本中改变对应的值后再`return`.