import { FC } from 'react'

import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectChartLegendOptions } from '../../store/chart/selectors'
import { selectRegionsData } from '../../store/regions/selectors'
import { Chart } from '../chart/Main'
import { ChartDownloadPanel } from '../chartDownloadPanel/Main'
import { ChartOptions } from '../chartOptions/Main'
import { DataTable } from '../dataTable/Main'
import { LegendsTable } from '../legendsTable/Main'
import styles from './styles.module.css'

export const Content: FC = () => {
    
    const data = useTypedSelector(selectRegionsData)
    const legendOptions = useTypedSelector(selectChartLegendOptions)

    return (
        <div className={styles.content}>
            <div className={styles.section}>
                <DataTable />
                <LegendsTable />
            </div>
            <div className={styles.section}>
                <Chart data={data} legendOptions={legendOptions} />
                <ChartOptions />
                <ChartDownloadPanel data={data} legendOptions={legendOptions} />
            </div>
        </div>
    )
}
