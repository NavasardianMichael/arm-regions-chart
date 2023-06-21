import { FC } from 'react'
import styles from './styles.module.css'


type T_Props = {}

export const ChartOptions: FC<T_Props> = () => {
    return (
        <div className={styles.chartOptions}>
            Chart Options
        </div>
    )
}