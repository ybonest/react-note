### react基本使用
1. 运行 cnpm i react react-dom -S 安装包
  - react:专门用于创建组件，同时组件的生命周期都在这个包中
  - react-dom:专门进行DOM操作的，最主要的应用场景，就是`ReactDOM.render()`
2. 在index.html页面中创建容器

```html
<!-- 容器，将来，使用 React 创建的虚拟DOM元素，都会被渲染到这个指定的容器中 -->
<div id="app"></div>
```

3. 导入包

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
```

4. 创建虚拟DOM元素

```javascript
//  第一个参数： 字符串类型的参数，表示要创建的标签的名称
//  第二个参数：对象类型的参数， 表示 创建的元素的属性节点
//  第三个参数： 子节点
const myh1 = React.createElement('h1', { title: '啊，五环', id: 'myh1' }, '你比四环多一环')
```

### JSX语法
**JSX语法：**就是符合 xml 规范的 JS 语法

#### webpack中解析jsx语法的配置
- 安装 babel 插件
  - 运行cnpm i babel-core babel-loader babel-plugin-transform-runtime -D
  - 运行cnpm i babel-preset-env babel-preset-stage-0 -D
- 安装能够识别转换jsx语法的包 babel-preset-react 
  - 运行cnpm i babel-preset-react -D
- 添加 .babelrc 配置文件

```
{
  "presets": ["env", "stage-0", "react"],
  "plugins": ["transform-runtime"]
}
```

- 添加babel-loader配置项：

```
module: { //要打包的第三方模块
    rules: [
      { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
}
```

+ **jsx 语法的本质：**并不是直接把 jsx 渲染到页面上，而是 内部先转换成了 createElement 形式，再渲染的；
+ **在 jsx 中混合写入 js 表达式：**在 jsx 语法中，要把 JS代码写到 { } 中
+ **在 jsx 中 写注释：**推荐使用{ /* 这是注释 */ }
+ **为 jsx 中的元素添加class类名**：需要使用className 来替代 class；htmlFor替换label的for属性
+ 在JSX创建DOM的时候，所有的节点，必须有唯一的根元素进行包裹；
+ 在 jsx 语法中，标签必须 成对出现，如果是单标签，则必须自闭和！