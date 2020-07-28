import React, { useContext, useEffect, useReducer } from 'react'
import { effect, stop, isRef } from '@vue/reactivity'

const storeContext = React.createContext(null)

export const useStore = (selector) => {
  const store = useContext(storeContext)
  if (!store) throw new Error('没有发现context的value,请在组件上使用<Provider>包裹！')
  const [ , forceUpdateDispatch ] = useReducer(v => v + 1, 0)
  let runner
  if (!runner) {
    runner = effect(
      () => selector(store),
      {
        lazy: true,
        scheduler: j => {
          if (j() === undefined) return
          forceUpdateDispatch()
        }
      })
  }
  useEffect(() => stop(runner), []) //卸载组件后取消effect
  const value = runner()
  //自动脱 Ref 功能>>判断对象是ref 则返回.value (在渲染环境不需要 .value 去取值，极大的减少的心智负担。)
  for (let key in value) if (isRef(value[key])) value[key] = value[key].value
  return value
}
export const Provider = storeContext.Provider
