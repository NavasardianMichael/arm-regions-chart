import { FC } from 'react'
import styles from './styles.module.css'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { selectChartStyles } from 'store/chart/selectors'
import { setChartLegendStyles } from 'store/chart/slice'
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox'


type T_Props = {}

export const ChartOptions: FC<T_Props> = () => {
    const dispatch = useTypedDispatch();
    // const chartStyles = useTypedSelector(selectChartStyles);

    const handleShowLegendChange = (e: CheckboxChangeEvent) => {
        dispatch(setChartLegendStyles({  showLegend: e.target.checked }))
    }

    return (
        <div className={styles.chartOptions}>
            <Checkbox onChange={handleShowLegendChange}>Show Legend</Checkbox>
        </div>
    )
}