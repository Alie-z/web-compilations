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

