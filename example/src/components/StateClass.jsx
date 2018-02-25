import React from "react";

// console.dir(React.Component);

export default class World extends React.Component {
  constructor() {
    super(); //继承父类时，使用this关键字前必须先调用super()
    this.state = {  //state时react规定的存放class创建的组件的数据的一种方式，（使用构造函数创建的组件没有state属性）
      msg: "123"
    };
  }

  render() {
    // console.log(this);
    return <div>
      <h5>{this.state.msg}</h5>
      <h5>姓名：{this.props.name}</h5>
      <h5>年龄：{this.props.age}</h5>
      <h5>性别：{this.props.gender}</h5>
    </div>
  }
}
