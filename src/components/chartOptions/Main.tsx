import { FC } from 'react'
import styles from './styles.module.css'
import { Checkbox, FormControlLabel } from '@mui/material'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectChartStyles } from '../../store/chart/selectors'
import { useTypedDispatch } from '../../hooks/useTypedDispatch'
import { setChartLegendStyles } from '../../store/chart/slice'
import { SwitchBaseProps } from '@mui/material/internal/SwitchBase'


type T_Props = {}

export const ChartOptions: FC<T_Props> = () => {
    const dispatch = useTypedDispatch();
    const chartStyles = useTypedSelector(selectChartStyles);

    const handleShowLegendChange: SwitchBaseProps['onChange'] = () => {
        dispatch(setChartLegendStyles({  showLegend: !chartStyles.showLegend }))
    }

    return (
        <div className={styles.chartOptions}>
            <FormControlLabel control={<Checkbox checked={chartStyles.showLegend} onChange={handleShowLegendChange} />} label="Show Legend" />
        </div>
    )
}