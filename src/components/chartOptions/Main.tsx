import { FC } from 'react'
import styles from './styles.module.css'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { selectChartStyles } from 'store/chart/selectors'
import { setChartLegendStyles } from 'store/chart/slice'
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox'
import { Col, Flex, Form, InputNumber, Row, Slider, Switch } from 'antd'
import { SwitchChangeEventHandler } from 'antd/es/switch'


type T_Props = {}

export const ChartOptions: FC<T_Props> = () => {
    const dispatch = useTypedDispatch();
    const { showLegend, fontSize, showLabels } = useTypedSelector(selectChartStyles);

    const handleFontSizeChange = (value: number | null) => {
        dispatch(setChartLegendStyles({  fontSize: value ?? 0 }))
    }

    return (
        <div className={styles.chartOptions}>
            <Form.Item label="Show Legend">
                <Switch 
                    onClick={() => dispatch(setChartLegendStyles({  showLegend: !showLegend }))} 
                    checked={showLegend} 
                />
            </Form.Item>            
            <Form.Item label="Show Labels">
                <Switch 
                    onClick={() => dispatch(setChartLegendStyles({  showLabels: !showLabels }))} 
                    checked={showLabels} 
                />
            </Form.Item>            
            <Form.Item label="Show Legend">
                <Flex gap='middle' style={{width: 400}}>
                    <Col span={12}>
                        <Slider
                            min={10}
                            max={30}
                            onChange={handleFontSizeChange}
                            value={typeof fontSize === 'number' ? fontSize : 0}
                        />
                    </Col>
                    <Col span={4}>
                        <InputNumber
                            min={10}
                            max={30}
                            value={fontSize}
                            onChange={handleFontSizeChange}
                        />
                    </Col>
                </Flex>
            </Form.Item>            
        </div>
    )
}