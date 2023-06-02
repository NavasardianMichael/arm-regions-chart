import { FC } from 'react'
import styles from './styles.module.css'
import { Chart } from '../chart/Main'

export const Content: FC = () => {
    return (
        <div className={styles.content}>
            <div className={styles.dataSection}>
                <Chart />
            </div>
            <div className={styles.chartSection}>
                <Chart />
            </div>
        </div>
    )
}