### saga辅助函数
1. takeEvery 
- 监听`FETCH_DATA_REQUEST`的action，一旦`FETCH_DATA_REQUEST`被`dispatch`,  就会调用`tetchData`函数，`takeEvery`允许多个fetchData同时启动。

```
import { call, put } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga'

function* fetchData(action){
  try{
    const data = yield call(Api.fetch, action.payload.url);
    yield put({type: 'FETCH_DATA_SUCCESS', data});
  } catch (error) {
    yield put({type: 'FETCH_DATA_FAILURE', error})
  }
}

function* watchData(){
  yield* takeEvery('FETCH_DATA_REQUEST', fetchData)
}
```

- 使用`takeEvery('*')`捕获所有类型的`action`, (`*`代表通配符模式)，

```
import { takeEvery } from 'redux-saga';

function* watchAndLog(getState) {
  yield* takeEvery('*', function* logger(action){
    console.log('action',action);
    console.log('state after', getState());
  })
}
```

2. takeLatest
与`takeEvery`作用类似，但`takeLatest`只允许最新的fetchData任务，一旦新的任务来到，旧的将自动被取消

```
import { takeLatest } from 'redux-saga';

function* watchData(){
  yield* takeLatest('FETCH_DATA_REQUEST', fetchData);
}
```

3. call
- 使用`call(fn, ...args)`，fn并不立即调用，而只是返回一个纯文本对象的函数，它会使暂停`Generator`，直到返回的`Promise`被`resolve`
- call同样支持调用对象方法，可以为调用的函数提供this上下文： `yield call([obj, obj.method], arg1, arg2, ....)`
- 除call外，apply提供了另外一种调用方式：`yield apply(obj, obj.method, [arg1, arg2, ...])`

4. put
- `put`用于创建`dispatch Effect`

```
import { call, put } from 'redux-saga/effects'

function* fetchProducts(){
  const products = yield call(Api.fetch, '/products')
  // 创建并yield 一个 dispatch Effect
  yield put({type:'FETCH_DATA_REQUEST'});
}
```

4. take
- 监听某个特定的`action`是否被发起，若没有则暂停`Generator`函数，直到`action`被发起

```
function* watchAndLog(getState){
  while(true){
    const action = yield take('*');
    console.log('action', action);
    console.log('state after', getState())
  }
}
```

- 关于Generator函数中使用while(true)循环的思考与总结：
  常态下，普通函数中while(true)是一个死循环，会导致代码卡死在循环处，但是在Generator函数中则不同，Generator函数中代码中若由`yield`，则函数调用后并不是自动从头执行到尾，而是需要使用next函数将当前`Generator`函数中运行的指针指到下一个被`yield`修饰的语句处，若不继续使用`next`函数，则代码暂停
  在`redux-saga`中，`take`与`takeEvery`的实现猜测是借用了`next`函数，当有`action`时，被触发，执行，整个过程是个累计的过程，若在`while(true)`循环外定义一个变量`i=0`，在循环中累加，如：`i++`，那么每发处一次`action`则`i+1`,所以i会越来越大。