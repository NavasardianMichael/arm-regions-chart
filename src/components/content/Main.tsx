import { FC, useState } from 'react'
import { Collapse, CollapseProps, Flex } from 'antd'
import { ChartStyles } from './styles/chart/Main'
import { LegendStyles } from './styles/legend/Main'
import { selectChart } from 'store/chart/selectors'
import { selectRegionsData } from 'store/regions/selectors'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { ChartDownloadPanel } from 'components/chartDownloadPanel/Main'
import { DataInput } from 'components/content/dataInput/chart/Main'
import { LegendDataInput } from './dataInput/legend/Main'
import { Chart } from './ui/chart/Main'
import styles from './styles.module.css'

const TABS = {
  chartDataInput: 'chartDataInput',
  legendDataInput: 'legendDataInput',
  chartStyles: 'chartStyles',
  legendStyles: 'legendStyles',
} as const

export const Content: FC = () => {
  const data = useTypedSelector(selectRegionsData)
  const chart = useTypedSelector(selectChart)
  const [activeKey, setActiveKey] = useState<(typeof TABS)[keyof typeof TABS]>(TABS.chartDataInput)
  const translations = useTranslations()

  const items: CollapseProps['items'] = [
    {
      key: TABS.chartDataInput,
      label: translations.chartData,
      children: <DataInput />,
    },
    {
      key: TABS.legendDataInput,
      label: translations.chartData,
      children: <LegendDataInput />,
    },
    {
      key: TABS.chartStyles,
      label: translations.chartStyles,
      children: <ChartStyles />,
    },
    {
      key: TABS.legendStyles,
      label: translations.legendStyles,
      children: <LegendStyles />,
    },
  ]

  return (
    <Flex gap="middle" align="start" style={{ padding: 'var(--size-sm)', flex: 1 }}>
      <Collapse
        items={items}
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key as (typeof TABS)[keyof typeof TABS])}
        className={styles.section}
      />
      <Flex vertical gap="middle" className={styles.section}>
        <Chart data={data} chart={chart} />
        <ChartDownloadPanel data={data} chart={chart} />
      </Flex>
    </Flex>
  )
}
