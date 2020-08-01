import {reactive, effect} from '@vue/reactivity';

export const state = reactive({
  count: 0,
});

export const add = () => {
  state.count += 1
};

effect(() => {
  console.log('count', state.count)
})

export const store = reactive(state)

