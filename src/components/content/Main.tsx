import { FC } from 'react'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { selectRegionsData } from 'store/regions/selectors'
import { selectChart } from 'store/chart/selectors'
import { DataTable } from 'components/dataTable/Main'
import { LegendsTable } from 'components/legendsTable/Main'
import { Chart } from 'components/chart/Main'
import { ChartOptions } from 'components/chartOptions/Main'
import { ChartDownloadPanel } from 'components/chartDownloadPanel/Main'
import styles from './styles.module.css'
import { Flex } from 'antd'

export const Content: FC = () => {
    
    const data = useTypedSelector(selectRegionsData)
    const chart = useTypedSelector(selectChart)

    return (
        <Flex wrap='wrap' gap='middle' style={{padding: 'var(--size-sm)', flex: 1}}>
            <Flex className={styles.section} gap='middle' vertical>
                <DataTable />
                <LegendsTable />
            </Flex>
            <Flex className={styles.section} vertical gap='middle'>
                <Chart data={data} chart={chart} />
                <ChartOptions />
                <ChartDownloadPanel data={data} chart={chart} />
            </Flex>
        </Flex>
    )
}
