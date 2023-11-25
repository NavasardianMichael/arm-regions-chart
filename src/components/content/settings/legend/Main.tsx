import { FC } from 'react'
import styles from './styles.module.css'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { selectChartStyles } from 'store/chart/selectors'
import { setChartLegendOptions, setChartLegendStyles } from 'store/chart/slice'
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox/Checkbox'
import { Col, ColorPicker, Flex, Form, InputNumber, Row, Slider, Switch } from 'antd'
import { SwitchChangeEventHandler } from 'antd/es/switch'
import { Color } from 'antd/es/color-picker'
import { T_Legend } from 'store/chart/types'


type T_Props = {}

export const LegendSettings: FC<T_Props> = () => {
    const dispatch = useTypedDispatch();
    const { showLegend, fontSize, showLabels } = useTypedSelector(selectChartStyles);

    const handleFontSizeChange = (value: number | null) => {
        dispatch(setChartLegendStyles({  fontSize: value ?? 0 }))
    }

    const handleColorChange: ((value: Color, hex: string, id: T_Legend['id']) => void) = (value, hex, id) => {
        dispatch(setChartLegendOptions({
            id,
            color: hex
        }))
    }

    return (
        <div className={styles.chartOptions}>
            <Form.Item label="Show Legend">
                <Switch 
                    onClick={() => dispatch(setChartLegendStyles({  showLegend: !showLegend }))} 
                    checked={showLegend} 
                />
            </Form.Item>
            <Form.Item label="Legend Color">
                {/* <ColorPicker 
                    data-chart-option-name={LEGEND_OPTION_NAMES.color}
                    value={value}
                    onChange={(value: Color, hex: string) => handleColorChange(value, hex, id)}
                /> */}
            </Form.Item>            
            <Form.Item label="Font Size">
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