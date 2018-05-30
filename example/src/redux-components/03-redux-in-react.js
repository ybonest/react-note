import { createStore, combineReducers } from 'redux';
// 定义action
const actionType = {
  UP_ACTION: 'UP_ACTION',
  DOWN_ACTION: 'DOWN_ACTION',
  LEFT_ACTION: 'LEFT_ACTION',
  RIGHT_ACTION: 'RIGHT_ACTION'
}

export const upAction = (val, time, id) => {
  return {
    type: actionType.UP_ACTION,
    val,
    time,
    id
  }
}

export const downAction = (val, time, id) => {
  return {
    type: actionType.DOWN_ACTION,
    val,
    time,
    id
  }
}

export const leftAction = (val, time, id) => {
  return {
    type: actionType.LEFT_ACTION,
    val,
    time,
    id
  }
}

export const rightAction = (val, time, id) => {
  return {
    type: actionType.RIGHT_ACTION,
    val,
    time,
    id
  }
}

// 定义reducer
const animation = (state={up:[],down:[],left:[],right:[]}, action) => {
  const {val, time, id} = action;
  
  switch (action.type) {
    case actionType.UP_ACTION:
      return Object.assign({}, state,{up:state.up.concat([{ up: val, time, id }])});
    case actionType.DOWN_ACTION:
      return Object.assign({}, state, {down:state.down.concat([{ down: val, time, id }])});
    case actionType.LEFT_ACTION:
      return Object.assign({}, state, {left:state.left.concat([{ left: val, time, id }])});
    case actionType.RIGHT_ACTION:
      return Object.assign({}, state, {right:state.right.concat([{ right: val, time, id }])});
    default:
      return state;
  }
}

const reducers = combineReducers({
  animation
})


// 创建store
export default createStore(reducers)