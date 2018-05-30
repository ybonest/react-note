import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import store,{upAction,downAction,leftAction,rightAction} from './redux-components/03-redux-in-react.js';
import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ComponentsList extends Component{
  constructor(){
    super();
    this.state = {
      val: 0,
      time: 0,
      left: 100,
      top: 100
    }
    this.handleChangeVal = this.handleChangeVal.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.eventAnimation = {}
  }
  handleChangeVal(e){
    this.setState({
      val: e.target.value
    })
  }
  handleChangeTime(e){
    this.setState({
      time: e.target.value
    })
  }
  handleClick(direction){
    const {val, time} = this.state;
    this.props.actions[`${direction}Action`](val, time, new Date().getTime());
    this.handleAnimation();
  }
  handleAnimation(){
    const { up, down, left, right } = this.props;
    const arr = up.concat(down,left,right).sort((a,b) => a.id - b.id);
    arr.forEach(element => {
      element['up'] && this.setState({
        top: this.ele.offsetLeft - element['up'] 
      });
      element['down'] && this.setState({
        top: this.ele.offsetLeft + element['down'] 
      });
      element['left'] && this.setState({
        top: this.ele.offsetLeft - element['left'] 
      });
      element['right'] && this.setState({
        top: this.ele.offsetLeft + element['right'] 
      });
    });
  }
  render(){
    return (
      <div style={{height:800,width:1200,position:'relative',margin:'0 auto',border:'1px solid #ccc'}}>
        <label>移动距离</label><input type='text' value={this.state.val} onChange={this.handleChangeVal}/>
        <label>时间</label><input type='text' value={this.state.time} onChange={this.handleChangeTime}/>
        <button onClick={this.handleClick.bind(this,'up')} style={{position:'absolute',top: 30,left: 10}}>向上</button>
        <button onClick={this.handleClick.bind(this,'down')} style={{position:'absolute',top: 30,left: 60}}>向下</button>
        <button onClick={this.handleClick.bind(this,'left')} style={{position:'absolute',top: 30,left: 110}}>向左</button>
        <button onClick={this.handleClick.bind(this,'right')} style={{position:'absolute',top: 30,left: 160}}>向右</button>
        <button onClick={this.handleClick.bind(this,'right')} style={{position:'absolute',top: 30,left: 210}}>移动</button>
        <button onClick={this.handleClick.bind(this,'right')} style={{position:'absolute',top: 30,left: 260}}>暂停</button>
        <button onClick={this.handleClick.bind(this,'right')} style={{position:'absolute',top: 30,left: 310}}>重新开始</button>
        <div px={this.state.up} ref={(ele) => this.ele = ele} style={{position:'absolute',left:this.state.left,top: this.state.top,height:30,width:30,backgroundColor:'pink'}} />
      </div>
    )
  }
}

const ContainerComponentList = connect(
  state => ({
    up: state.animation.up,
    down: state.animation.down,
    left: state.animation.left,
    right: state.animation.right
  }),
  dispatch => ({
    actions:bindActionCreators({
      upAction,
      downAction,
      leftAction,
      rightAction
    },dispatch)
  })
)(ComponentsList)

const rootApp = (
  <div>
    <Provider store={store}>
      <ContainerComponentList />
    </Provider>
  </div>
)

store.subscribe(function(){
  console.log(store.getState());
})

ReactDOM.render(rootApp, document.getElementById('app'));