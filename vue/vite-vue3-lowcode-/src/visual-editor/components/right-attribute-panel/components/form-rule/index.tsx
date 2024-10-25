/*
 * @Author: 卜启缘
 * @Date: 2021-07-05 10:51:09
 * @LastEditTime: 2022-07-02 22:46:59
 * @LastEditors: 卜启缘
 * @Description: 表单规则
 * @FilePath: /vite-vue3-lowcode/src/visual-editor/components/right-attribute-panel/components/form-rule/index.tsx
 */
import { defineComponent } from 'vue';
import { ElCard, ElTooltip } from 'element-plus';
import { QuestionFilled } from '@element-plus/icons-vue';

export const FormRule = defineComponent({
  setup() {
    return () => (
      <>
        <ElCard shadow={'always'} class={'mb-20px'}>
          {{
            header: () => (
              <div class="flex justify-between">
                <span>设置关联规则</span>
                <ElTooltip content="当前面题目选中某些选项时才出现此题" placement="bottom-end">
                  <el-icon>
                    <QuestionFilled />
                  </el-icon>
                </ElTooltip>
              </div>
            ),
            default: () => <div>暂无规则</div>,
          }}
        </ElCard>
        <ElCard shadow={'always'} bodyStyle={{ padding: '0' }} class={'mb-20px'}>
          {{
            header: () => (
              <div class="flex justify-between">
                <span>设置选项关联规则</span>
                <ElTooltip
                  content="当前面题目选择某些选项时才出现此题的某些选项 "
                  placement="bottom-end"
                >
                  <el-icon>
                    <QuestionFilled />
                  </el-icon>
                </ElTooltip>
              </div>
            ),
            default: () => null,
          }}
        </ElCard>
      </>
    );
  },
});
