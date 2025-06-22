import { FC, useState } from 'react'
import { InfoCircleOutlined } from '@ant-design/icons'
import { Collapse, CollapseProps, Flex, Tooltip } from 'antd'
import { ChartStyles } from './styles/chart/Main'
import { LegendStyles } from './styles/legend/Main'
import { selectChart } from 'store/chart/selectors'
import { selectRegionsData } from 'store/regions/selectors'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { ChartDownloadPanel } from 'components/chartDownloadPanel/Main'
import { DataInput } from 'components/content/dataInput/chart/Main'
import { SectionTitle } from './SectionTitle'
import { LegendDataInput } from './dataInput/legend/Main'
import { Chart } from './ui/chart/Main'
import styles from './styles.module.css'
import { combineClassNames } from 'helpers/functions/commons'

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
          <SectionTitle text={translations.chartData} />
          <Tooltip placement="bottom" title={translations.dataInputHint} color="#108ee9">
            <InfoCircleOutlined style={{ color: '#1677ff', fontSize: 18 }} />
          </Tooltip>
        </Flex>
      ),
      children: <DataInput />,
    },
    {
      key: TABS.legendDataInput,
      label: <SectionTitle text={translations.legendData} />,
      children: <LegendDataInput />,
    },
    {
      key: TABS.chartStyles,
      label: <SectionTitle text={translations.chartStyles} />,
      children: <ChartStyles />,
    },
    {
      key: TABS.legendStyles,
      label: <SectionTitle text={translations.legendStyles} />,
      children: <LegendStyles />,
    },
  ]

  return (
    <Flex gap="middle" align="start" className={styles.container}>
      <Collapse
        items={items}
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key as (typeof TABS)[keyof typeof TABS])}
        className={styles.section}
      />
      <Flex vertical gap="middle" className={combineClassNames(styles.section, styles.chartWrapper)}>
        <Flex vertical style={{ border: '1px solid var(--lightgray)', borderRadius: 6 }}>
          <Chart data={data} chart={chart} />
        </Flex>
        <ChartDownloadPanel data={data} chart={chart} />
      </Flex>
    </Flex>
  )
}
