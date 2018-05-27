### saga辅助函数
#### 1. takeEvery 
监听`FETCH_DATA_REQUEST`的action，一旦`FETCH_DATA_REQUEST`被`dispatch`,  就会调用`tetchData`函数，`takeEvery`允许多个fetchData同时启动。

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

使用`takeEvery('*')`捕获所有类型的`action`, (`*`代表通配符模式)，

```
import { takeEvery } from 'redux-saga';

function* watchAndLog(getState) {
  yield* takeEvery('*', function* logger(action){
    console.log('action',action);
    console.log('state after', getState());
  })
}
```

#### 2. takeLatest
与`takeEvery`作用类似，但`takeLatest`只允许最新的fetchData任务，一旦新的任务来到，旧的将自动被取消

```
import { takeLatest } from 'redux-saga';

function* watchData(){
  yield* takeLatest('FETCH_DATA_REQUEST', fetchData);
}
```

#### 3. call
- 使用`call(fn, ...args)`，fn并不立即调用，而只是返回一个纯文本对象的函数，它会使暂停`Generator`，直到返回的`Promise`被`resolve`
- call同样支持调用对象方法，可以为调用的函数提供this上下文： `yield call([obj, obj.method], arg1, arg2, ....)`
- 除call外，apply提供了另外一种调用方式：`yield apply(obj, obj.method, [arg1, arg2, ...])`

同时执行多个任务
```
import { call } from 'redux-saga/effects'

const [users, repos] = yield [
  call(fetch, '/users'),
  call(fetch, '/repos')
]
```

TODO: 疑问，call调用函数的类型，以及在什么情况下会阻塞代码的执行

#### 4. put
`put`用于创建`dispatch Effect`

```
import { call, put } from 'redux-saga/effects'

function* fetchProducts(){
  const products = yield call(Api.fetch, '/products')
  // 创建并yield 一个 dispatch Effect
  yield put({type:'FETCH_DATA_REQUEST'});
}
```

#### 4. take
监听某个特定的`action`是否被发起，若没有则暂停`Generator`函数，直到`action`被发起

```
function* watchAndLog(getState){
  while(true){
    const action = yield take('*');
    console.log('action', action);
    console.log('state after', getState())
  }
}
```

还可以将多个控制流写在同一个逻辑中，例如登录和退出，如下

```
function* loginFlow(){
  while(true){
    yield take('LOGIN')
    // do something for logic
    yield take('LOGOUT')
    // do something for logout
  }
}
```

一个`take`还可以监听多个action

```
function* loginFlow(){
  while(true){
    yield take('LOGIN')
    // do something for logic
    yield take(['LOGOUT','LOGIN_ERROR'])
    // do something for logout and LOGIN_ERROR
  }
}
```

关于Generator函数中使用while(true)循环的思考与总结：
常态下，普通函数中while(true)是一个死循环，会导致代码卡死在循环处，但是在Generator函数中则不同，Generator函数中代码中若由`yield`，则函数调用后并不是自动从头执行到尾，而是需要使用next函数将当前`Generator`函数中运行的指针指到下一个被`yield`修饰的语句处，若不继续使用`next`函数，则代码暂停。
在`redux-saga`中，`take`与`takeEvery`的实现猜测是借用了`next`函数，当有`action`时，被触发，执行，整个过程是个累计的过程，若在`while(true)`循环外定义一个变量`i=0`，在循环中累加，如：`i++`，那么每发处一次`action`则`i+1`,所以i会越来越大。


#### 5. fork
使用`fork`实现无阻塞调用

上面我们接触了`call`实现函数调用的方式，它需等待函数执行完，并返回结果,然后继续执行下面的代码。看下面这个例子, 当监听到`LOGIN_REQUEST`时,`call`调用`authorize`函数，并等待函数返回结果，并根据结果执行之后的逻辑，但是这种情况下会存在一个问题，若`authorize`函数没执行完，用户又发起了`LOGOUT`，此时由于`authorize`的结果未返回，会导致`LOGOUT`请求的丢失，而`fork`就是为了应付类似这种情况的存在，我们不必等待`authorize`函数的返回结果。

```
import { take, call, put } from 'redux-saga/effects'
function* authorize(){
  try {
    const token = yield call(Api.authorize, user, password);
    yield put({type: 'LOGIN_SUCCESS', token})
    return token
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

function* loginFlow(){
  while(true){
    const { user, password } = yield take('LOGIN_REQUEST');
    const token = yield call(authorize, user, password);
    if(token){
      yield call(Api.storeItem({token}))
      yield take('LOGOUT');
      yield call(Api.clearItem('token'))
    }
  }
}
```

使用`fork`

```
import { take, call, put, fork } from 'redux-saga/effects'
function* authorize(){
  try {
    const token = yield call(Api.authorize, user, password);
    yield put({type: 'LOGIN_SUCCESS', token})
    yield call(Api.storeItem({token}))
  } catch(error) {
    yield put({type: 'LOGIN_ERROR', error})
  }
}

function* loginFlow(){
  while(true){
    const { user, password } = yield take('LOGIN_REQUEST');
    yield fork(authorize, user, password);  // 此时不必再等待
    yield take(['LOGOUT', 'LOGIN_ERROR'])
    yield call(Api.clearItem('token'))
  }
}
```

#### 6. cancel
`cancel`用来取消`fork`任务

上面`fork`介绍中使用`fork`代替`call`的实现方式还存在一个问题，虽然对`LOGOUT`的监听不再需要等待`authorize`函数返回结果，但是若果`authorize`正在执行，用户又发起了`LOGOUT`，此时`Api.clearItem('token')`被调用，但是`authorize`函数执行完成后，又可能执行`Api.storeItem({token})`，重新注入了`token`，从而导致了退出失败，为了解决这种情况下，就需要用到`cancel`取消`fork`任务

```
import { put, call, cancel, fork, take} from 'redux-saga/effects';

function* loginFlow(){
  while(true){
    const { user, password } = yield take('LOGIN_REQUEST');
    const task = yield fork(authorize, user, password);
    const action = yield take(['LOGOUT', 'LOGIN_ERROR']);
    if(action.type === 'LOGOUT')
      yield cancel(task);
      yield call(Api.clearItem('token'));
  }
}
```

`cancel Effect`不会粗暴的结束任务，而会在里面抛出一个特殊的错误，在某些情况下可以用此处理一些任务被取消后的特定逻辑

```
import { isCancelError } from 'redux-saga';
import { take, call, put } from 'redux-saga/effects';

function* authorize(user, password){
  try{
    const token = yield call(Api.authorize, user, password)
    yield put({type: 'LOGIN_SUCCESS', token})
  }catch(error){
    if(!isCancelError)){
      yield put({type:'LOGIN_ERROR', error})
    }
  }
}
```

#### 7. race
当同时启动多个任务时，不需要等待所有任务都完成，而是任意一个完成任务后就结束所有任务，此时需要用到`race`

下面这个例子中当请求时间超过1000后，会执行超时处理

```
import { race, take, put } from 'redux-saga/effects';

function* fetchPostsWithTimeout(){
  const { posts, timeout } = yield tace({
    posts: call(fetchApi, '/posts'),
    timeout: call(delay, 1000)
  })
  if(posts){
    put({type: 'POSTS_RECEIVED', posts})
  } else {
    put({type: 'TIMEOUT_ERROR'});
  }
}

function* delay(arg){
  const result = yield new Promse(function(resolve,reject){
    setTimeout(() => {
      resolve('hahah')
    }, arg)
  })
  return result;
}
```

`race`的也可以自动取消失败的`Effects`,如下例子,在`CANCEL_TASK`被发起的情况下，`race Effect`将自动取消`backgroundTask`，并在`backgroundTask`中抛出一个错误消息

```
import { race, take, put } from 'redux-saga/effects';

function* backgroundTask(){
  while(true){ ... }
}

function* watchStartBackgroundTask(){
  while(true){
    yield take('START_BACKGROUND_TASK')
    yield race({
      task: call(backgroundTask),
      cancel: take('CANCEL_TASK')
    })
  }
}
```

