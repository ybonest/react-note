import { combineReducers, createStore } from 'redux';


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
export default createStore(reducer);

