import * as echarts from 'echarts'

// 注册中国地图数据
import ChinaMapData from '../data/china.json'
echarts.registerMap('china', ChinaMapData)

export default function (el: HTMLElement) {
  const echartInstance = echarts.init(el)

  const setOptions = (options: echarts.EChartsOption) => {
    echartInstance.setOption(options)
  }

  // 满足菜单栏收起时Echart图标响应式
  const updateSize = () => {
    echartInstance.resize()
  }

  // 设置echart绑定的实例响应式  随页面等比例放大/缩小
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })

  return {
    echartInstance,
    setOptions,
    updateSize
  }
}
