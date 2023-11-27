import { FC, useState } from 'react'
import { Collapse, CollapseProps } from 'antd'
import { LegendStyles } from './legend/Main'
import { ChartStyles } from './chart/Main'

const TABS = {
  chart: 'chart',
  legend: 'legend',
} as const

export const Settings: FC = () => {
  const [activeKey, setActiveKey] = useState<(typeof TABS)[keyof typeof TABS]>(TABS.chart)

  const items: CollapseProps['items'] = [
    {
      key: TABS.chart,
      label: 'Chart settings',
      children: <ChartStyles />,
    },
    {
      key: TABS.legend,
      label: 'Legend settings',
      children: <LegendStyles />,
    },
  ]

  return (
    <Collapse
      items={items}
      activeKey={activeKey}
      defaultActiveKey={TABS.chart}
      onChange={(key) => setActiveKey(key as (typeof TABS)[keyof typeof TABS])}
    />
  )
}
