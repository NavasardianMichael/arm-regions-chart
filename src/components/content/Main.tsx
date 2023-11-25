import { Collapse, CollapseProps, Flex } from 'antd'
import { ChartDownloadPanel } from 'components/chartDownloadPanel/Main'
import { DataInput } from 'components/content/dataInput/chart/Main'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { FC, useState } from 'react'
import { selectChart } from 'store/chart/selectors'
import { selectRegionsData } from 'store/regions/selectors'
import { LegendDataInput } from './dataInput/legend/Main'
import { ChartSettings } from './settings/chart/Main'
import styles from './styles.module.css'
import { Chart } from './ui/chart/Main'
import { LegendSettings } from './settings/legend/Main'
import { useDispatch } from 'react-redux'

const TABS = {
    chartDataInput: 'chartDataInput',
    legendDataInput: 'legendDataInput',
    chartStyles: 'chartStyles',
    legendStyles: 'legendStyles',
} as const

export const Content: FC = () => {
    
    const data = useTypedSelector(selectRegionsData)
    const chart = useTypedSelector(selectChart)
    const [activeKey, setActiveKey] = useState<typeof TABS[keyof typeof TABS]>(TABS.chartDataInput)

    const items: CollapseProps['items'] = [
        {
          key: TABS.chartDataInput,
          label: 'Chart Data',
          children: <DataInput />
        },
        {
          key: TABS.legendDataInput,
          label: 'Legend Data',
          children: <LegendDataInput />
        },
        {
          key: TABS.chartStyles,
          label: 'Chart Styles',
          children: <ChartSettings />
        },
        {
          key: TABS.legendStyles,
          label: 'Legend Styles',
          children: <LegendSettings />
        },
    ];

    return (
        <Flex gap='middle' align='start' style={{padding: 'var(--size-sm)', flex: 1}}>
            <Collapse 
                items={items} 
                activeKey={activeKey} 
                onChange={key => setActiveKey(key as typeof TABS[keyof typeof TABS])}
                className={styles.section}
            />
            <Flex 
                vertical 
                gap='middle' 
                className={styles.section}
            >
                <Chart data={data} chart={chart} />
                <ChartDownloadPanel data={data} chart={chart} />
            </Flex>
        </Flex>
    )
}