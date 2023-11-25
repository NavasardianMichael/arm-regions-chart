import { FC } from 'react'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { selectRegionsData } from 'store/regions/selectors'
import { selectChart } from 'store/chart/selectors'
import { DataInput } from 'components/content/dataInput/chart/Main'
import { ChartDownloadPanel } from 'components/chartDownloadPanel/Main'
import styles from './styles.module.css'
import { Flex } from 'antd'
import { LegendDataInput } from './dataInput/legend/Main'
import { Chart } from './ui/chart/Main'
import { ChartSettings } from './settings/chart/Main'
import { Settings } from './settings/Main'

export const Content: FC = () => {
    
    const data = useTypedSelector(selectRegionsData)
    const chart = useTypedSelector(selectChart)

    return (
        <Flex wrap='wrap' gap='middle' style={{padding: 'var(--size-sm)', flex: 1}}>
            <Flex className={styles.section} gap='middle' vertical>
                <DataInput />
                <LegendDataInput />
                <Settings />
            </Flex>
            <Flex className={styles.section} vertical gap='middle'>
                <Chart data={data} chart={chart} />
                <ChartDownloadPanel data={data} chart={chart} />
            </Flex>
        </Flex>
    )
}
