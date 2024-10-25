import { InteractEventOn, InteractActionsType } from '@/enums/eventEnum'

// 时间组件类型
export enum ComponentInteractEventEnum {
  DATA = 'data'
}

// 联动参数
export enum ComponentInteractParamsEnum {
  DATA = 'data'
}

// 定义组件触发回调事件
export const interactActions: InteractActionsType[] = [
  {
    interactType: InteractEventOn.CHANGE,
    interactName: '选择完成',
    componentEmitEvents: {
      [ComponentInteractEventEnum.DATA]: [
        {
          value: ComponentInteractParamsEnum.DATA,
          label: '选择项'
        }
      ]
    }
  }
]
