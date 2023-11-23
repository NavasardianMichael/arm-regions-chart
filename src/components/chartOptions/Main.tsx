import { FC } from 'react'
import styles from './styles.module.css'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { selectChartStyles } from 'store/chart/selectors'
import { setChartLegendStyles } from 'store/chart/slice'
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox'
import { Form, Switch } from 'antd'
import { SwitchChangeEventHandler } from 'antd/es/switch'


type T_Props = {}

export const ChartOptions: FC<T_Props> = () => {
    const dispatch = useTypedDispatch();
    const { showLegend } = useTypedSelector(selectChartStyles);

    const handleShowLegendChange = () => {
        dispatch(setChartLegendStyles({  showLegend: !showLegend }))
    }

    return (
        <div className={styles.chartOptions}>
        <Form.Item label="Show Legend" valuePropName="checked">
            <Switch onClick={handleShowLegendChange} checked={showLegend} />
        </Form.Item>            
        </div>
    )
}