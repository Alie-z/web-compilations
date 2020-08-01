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
const delMsg = index => {
  // TODO 改变数组目前需要深复制 操作完再赋值 待优化
  const newMsg = JSON.parse(JSON.stringify(state.msgList))
  newMsg.splice(index, 1)
  state.msgList = newMsg
}

effect(() => {
  console.log('plusOne', plusOne)
})

export const mutations = {
  add,
  setMsg,
  sendMsg,
  delMsg
}

export const store = {
  state,
  computed: {
    plusOne,
    plusOneSquare
  }
}

