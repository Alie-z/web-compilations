## 简介

仅仅需要一个 `store` 文件，你就可以开始编写你的数据仓库。

本库只提供 `Provider` 和 `useStore` 两个 api，配合 `@vue/reactivity` 仓库里的响应式能力，即可完成一切状态管理。

## 安装
```JavaScript
// yarn
yarn add react-reactivity @vue/reactivity -S

// npm
npm install react-reactivity @vue/reactivity -S

```


## Store
```JavaScript
// store.js
import {reactive, effect, computed} from '@vue/reactivity'

export const state = reactive({
  count: 0,
  message: 'Hello',
  msgList: []
})

const plusOne = computed(() => state.count + 1);
const plusOneSquare = computed(() => plusOne.value * plusOne.value)

const add = () => state.count += 1
const setMsg = message => (state.message = message)
const sendMsg = msg => (state.msgList = [...state.msgList, msg])
const delMsg1 = index => {
  const newMsg = JSON.parse(JSON.stringify(state.msgList))
  newMsg.splice(index, 1)
  state.msgList = newMsg
}
const delMsg2 = index => state.msgList.splice(index, 1)

effect(() => {
  console.log('plusOne', plusOne)
})

export const mutations = {
  add,
  setMsg,
  sendMsg,
  delMsg1,
  delMsg2
}

export const store = {
  state,
  computed: {
    plusOne,
    plusOneSquare
  }
}

```

## Codes
```JavaScript
// index.js
import React from 'react';
import {Card, Button, Input} from 'antd';
import {Provider, useStore} from '../../src';
import {store, mutations} from './store';
import './index.css';
import 'antd/dist/antd.css';

function Count() {
  const countState = useStore((store) => {
    const {state, computed} = store
    const {plusOne, plusOneSquare} = computed
    return {
      count: state.count,
      plusOne,
      plusOneSquare
    }
  });

  return (
    <Card hoverable style={{marginBottom: 24}}>
      <h1>计数器</h1>
      <div className="chunk">
        <div className="text-chunk">count: {countState.count}</div>
        <div className="text-chunk">count加一: {countState.plusOne}</div>
        <div className="text-chunk">count加一后平方: {countState.plusOneSquare}</div>
        <Button onClick={mutations.add}>add</Button>
      </div>
    </Card>
  );
}

function Chat() {
  const message = useStore((store) => store.state.message)

  const _handleSend = msg => {
    mutations.setMsg('')
    mutations.sendMsg(msg)
  }
  return (
    <Card hoverable style={{marginBottom: 24}}>
      <h1>聊天室</h1>
      <div className="text-chunk">当前消息是: {message}</div>
      <Input.Search
        placeholder="请输入消息"
        enterButton="Send"
        size="large"
        value={message}
        onChange={v => mutations.setMsg(v.target.value)}
        onSearch={(msg) => _handleSend(msg)}
      />
    </Card>
  );
}

// function ViewArea() {
//   const msgList = useStore(store => store.state.msgList)
//
//   return (
//     <Card hoverable style={{marginBottom: 24}}>
//       <h1>消息列表</h1>
//       {msgList.map((msg, i) => <div onClick={() => mutations.delMsg1(i)} key={i}>{msg}</div>)}
//     </Card>
//   )
// }

function ViewArea() {
  const msgList = useStore((store) => {
    return store.state.msgList.map((msg, i) => (
      <div onClick={() => mutations.delMsg2(i)} key={i}>
        {msg}
      </div>
    ));
  });

  return (
    <Card hoverable style={{marginBottom: 24}}>
      <h1>消息列表</h1>
      {msgList}
    </Card>
  )
}


export default () => {
  return (
    <Provider value={store}>
      <div className="flex">
        <Count/>
        <Chat/>
        <ViewArea/>
      </div>
    </Provider>
  );
};

```

## 运行流程
1. 通过@vue/reactivity定义响应式state
2. 在父组件通过Provider将store传递下去
3. 子组件通过useStore传入一个schedule(store)方法
4. react-reactivity先通过useReducer在当前组件中注册一个强制更新的函数
5. 通过useContext读取用户从Provider中传入的store
6. 再通过Vue的effect去帮我们执行selector(store)，并且指定scheduler为forceUpdate，这样就完成了依赖收集
7. 响应式数据更新后，触发effect调用forceUpdate，完成页面渲染


