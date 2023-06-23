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

export const Content: FC = () => {
    
    const data = useTypedSelector(selectRegionsData)
    const chart = useTypedSelector(selectChart)

    return (
        <div className={styles.content}>
            <div className={styles.section}>
                <DataTable />
                <LegendsTable />
            </div>
            <div className={styles.section}>
                <Chart data={data} chart={chart} />
                <ChartOptions />
                <ChartDownloadPanel data={data} chart={chart} />
            </div>
        </div>
    )
}
