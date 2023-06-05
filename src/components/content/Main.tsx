import { FC } from 'react'
import styles from './styles.module.css'
import { Chart } from '../chart/Main'
import { DataTable } from '../dataTable/Main'

export const Content: FC = () => {
    return (
        <div className={styles.content}>
            <div className={styles.section}>
                <DataTable />
            </div>
            <div className={styles.section}>
                <Chart />
            </div>
        </div>
    )
}