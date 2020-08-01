import React from 'react';
import {Card, Button} from 'antd';
import {Provider, useStore} from '../../src';
import {store, add} from './store';
import './index.css';
import 'antd/dist/antd.css';

function Count() {
  const countState = useStore((store) => {
    return {
      count: store.count,
    }
  });

  return (
    <Card hoverable style={{marginBottom: 24}}>
      <h1>计数器</h1>
      <div className="chunk">
        <div className="text-chunk">store中的count现在是 {countState.count}</div>
        <Button onClick={add}>add</Button>
      </div>
    </Card>
  );
}

export default () => {
  return (
    <Provider value={store}>
      <div className="flex">
        <Count/>
      </div>
    </Provider>
  );
};
