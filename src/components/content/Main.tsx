import { FC, useState } from 'react'
import { Collapse, CollapseProps, Flex, Tooltip } from 'antd'
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
import { InfoCircleOutlined } from '@ant-design/icons'
import Title from 'antd/es/typography/Title'

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
      label: (
        <Flex justify="space-between" align="center">
          <Title
            style={{ margin: '0 0 0 8px', textAlign: 'left', textTransform: 'uppercase', fontSize: 14 }}
            level={5}
          >
            {translations.chartData}
          </Title>
          <Tooltip 
            placement="bottom" 
            title={translations.dataInputHint} 
            color='#108ee9'
          >
            < InfoCircleOutlined  style={{ color: '#1677ff', fontSize: 18 }} />
          </Tooltip>

        </Flex>
      ),
      children: <DataInput />,
    },
    {
      key: TABS.legendDataInput,
      label: (
        <Flex align="center">
          <Title
            style={{ margin: '0 0 0 8px', textAlign: 'left', textTransform: 'uppercase', fontSize: 14 }}
            level={5}
          >
            {translations.legendData}
          </Title>
        </Flex>
      ),
      children: <LegendDataInput />,
    },
    {
      key: TABS.chartStyles,
      label: (
        <Flex align="center">
          <Title
            style={{ margin: '0 0 0 8px', textAlign: 'left', textTransform: 'uppercase', fontSize: 14 }}
            level={5}
          >
            {translations.chartStyles}
          </Title>
        </Flex>
      ),
      children: <ChartStyles />,
    },
    {
      key: TABS.legendStyles,
      label: (
        <Flex align="center">
          <Title
            style={{ margin: '0 0 0 8px', textAlign: 'left', textTransform: 'uppercase', fontSize: 14 }}
            level={5}
          >
            {translations.legendStyles}
          </Title>
        </Flex>
      ),
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
