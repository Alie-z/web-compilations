import { onUnmounted, onMounted } from 'vue'
import { useChartEditStore } from '@/store/modules/chartEditStore/chartEditStore'
import { EditCanvasTypeEnum } from '@/store/modules/chartEditStore/chartEditStore.d'

const chartEditStore = useChartEditStore()

// 布局处理
export const useLayout = (fn: () => Promise<void>) => {
  let removeScale: Function = () => { }
  onMounted(async () => {
    // 设置 Dom 值(ref 不生效先用 document)
    chartEditStore.setEditCanvas(
      EditCanvasTypeEnum.EDIT_LAYOUT_DOM,
      document.getElementById('go-chart-edit-layout')
    )
    chartEditStore.setEditCanvas(
      EditCanvasTypeEnum.EDIT_CONTENT_DOM,
      document.getElementById('go-chart-edit-content')
    )

    // 获取数据
    await fn()
    // 监听初始化
    removeScale = chartEditStore.listenerScale()

  })

  onUnmounted(() => {
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.EDIT_LAYOUT_DOM, null)
    chartEditStore.setEditCanvas(EditCanvasTypeEnum.EDIT_CONTENT_DOM, null)
    removeScale()
  })
}