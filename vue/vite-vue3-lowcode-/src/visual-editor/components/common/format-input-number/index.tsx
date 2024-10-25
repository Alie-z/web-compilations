/*
 * @Author: 卜启缘
 * @Date: 2021-07-06 22:14:13
 * @LastEditTime: 2021-07-07 16:32:50
 * @LastEditors: 卜启缘
 * @Description:
 * @FilePath: \vite-vue3-lowcode\src\visual-editor\components\common\format-input-number\index.tsx
 */
import { defineComponent } from 'vue';
import { ElInput, ElIcon } from 'element-plus';
import { useVModel } from '@vueuse/core';
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';
import styles from './index.module.scss';
import type { PropType } from 'vue';

export const FormatInputNumber = defineComponent({
  props: {
    modelValue: {
      type: [String] as PropType<string>,
      default: '',
    },
    symbol: {
      // 符号
      type: String as PropType<string>,
      default: 'px',
    },
    max: {
      type: [Number],
      default: 100,
    },
    min: {
      type: [Number],
      default: 0,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs }) {
    const modelValue = useVModel(props, 'modelValue');

    const onInput = (val) => {
      let num = parseFloat(`${val}`.replace(/[^0-9]/gi, ''));
      num = Number.isNaN(num) ? 0 : num;
      num = Math.max(props.min, num);
      num = Math.min(props.max, num);
      modelValue.value = num + props.symbol;
    };

    const increment = () => {
      onInput(parseFloat(modelValue.value) + 1);
    };

    const cutdown = () => {
      onInput(Math.max(props.min, parseFloat(modelValue.value) - 1));
    };

    return () => (
      <div class={styles.formatInputNumber}>
        <ElInput
          model-value={modelValue.value}
          placeholder={'请输入内容'}
          {...attrs}
          onInput={onInput}
        >
          {{
            append: () => (
              <div class={'flex flex-col'}>
                <div onClick={increment} class={'cursor-pointer leading-0'}>
                  <ElIcon size={14}>
                    <ArrowUp />
                  </ElIcon>
                </div>
                <div onClick={cutdown} class={'cursor-pointer leading-0'}>
                  <ElIcon size={14}>
                    <ArrowDown />
                  </ElIcon>
                </div>
              </div>
            ),
          }}
        </ElInput>
      </div>
    );
  },
});
