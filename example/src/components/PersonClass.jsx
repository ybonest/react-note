import React,{Component} from "react"

//使用es6中的class类，并且继承Component类
export default class Person extends Component{
  // constructor(name,age,gender){    //类的构造函数，可接受实例参数，不写默认为constructor(){}
  //   super();  //继承父类属性值
  //   this.name = name;
  //   this.age = age;
  //   this.gender = gender;
  // }
  /** 
   * 1、使用class类创建组件必须定义render函数
   * 2、使用class类创建组件，对组件传参时参数直接挂在到对象的props属性上，
   *    不像使用构造函数创建组件，还需使用形参接受
   */
  render(){ 
    console.log(this.props);  //此处props也是只读的
    return <div>class组件
      <h5>姓名：{this.props.name}</h5>
      <h5>年龄：{this.props.age}</h5>
      <h5>性别：{this.props.gender}</h5>
    </div>
  }
}