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

function ViewArea() {
  const msgList = useStore(store => store.state.msgList)
  const _handleDelMsg = index => {
    console.log('index', index)
    mutations.delMsg(index)
  }
  return (
    <Card hoverable style={{marginBottom: 24}}>
      <h1>消息列表</h1>
      {msgList.map((msg, i) => <div onClick={() => _handleDelMsg(i)} key={i}>{msg}</div>)}
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
