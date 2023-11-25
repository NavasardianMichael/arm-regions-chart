import { Col, Flex, Form, InputNumber, Slider, Switch } from 'antd'
import ColorPicker, { Color } from 'antd/es/color-picker'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { FC } from 'react'
import { selectChartStyles } from 'store/chart/selectors'
import { setChartLegendOptions, setChartStyles } from 'store/chart/slice'
import { T_Legend } from 'store/chart/types'
import styles from './styles.module.css'


type T_Props = {}

export const ChartSettings: FC<T_Props> = () => {
    const dispatch = useTypedDispatch();
    const { fontSize, showLabels, color, borderColor } = useTypedSelector(selectChartStyles);

    const handleFontSizeChange = (value: number | null) => {
        dispatch(setChartStyles({  fontSize: value ?? 0 }))
    }

    const handleColorChange: ((value: Color, hex: string, id: T_Legend['id']) => void) = (value, hex, id) => {
        dispatch(setChartLegendOptions({
            id,
            color: hex
        }))
    }

    return (
        <div className={styles.chartOptions}>
            <Form.Item label="Show Labels">
                <Switch 
                    onClick={() => dispatch(setChartStyles({  showLabels: !showLabels }))} 
                    checked={showLabels} 
                />
            </Form.Item>            
            <Form.Item label="Show Labels">
                <ColorPicker 
                    value={color}
                    onChange={(value: Color, hex: string) => handleColorChange(value, hex)}
                />                
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