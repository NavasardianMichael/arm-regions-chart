import { Col, Flex, Form, InputNumber, Slider, Switch } from 'antd'
import ColorPicker, { Color } from 'antd/es/color-picker'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { FC } from 'react'
import { selectChartStyles, selectLegendStyles } from 'store/chart/selectors'
import { setLegendStyles } from 'store/chart/slice'
import { T_Legend } from 'store/chart/types'
import styles from './styles.module.css'


type T_Props = {}

export const LegendSettings: FC<T_Props> = () => {
    const dispatch = useTypedDispatch();
    const { show, fontSize, color, borderColor } = useTypedSelector(selectLegendStyles);

    return (
        <div className={styles.chartOptions}>
            <Form.Item label="Show Legend">
                <Switch 
                    onClick={() => dispatch(setLegendStyles({  show: !show }))} 
                    checked={show} 
                />
            </Form.Item>
            {
                show &&
                <>
                    <Form.Item label="Color">
                        <ColorPicker 
                            value={color}
                            onChange={(_, hex) => dispatch(setLegendStyles({  color: hex }))}
                        />                
                    </Form.Item>
                    <Form.Item label="Border Color">
                        <ColorPicker 
                            value={borderColor}
                            onChange={(_, hex) => dispatch(setLegendStyles({  borderColor: hex }))}
                        />
                    </Form.Item>
                    <Form.Item label="Font Size">
                        <Flex gap='middle' style={{width: 400}}>
                            <Col span={12}>
                                <Slider
                                    min={10}
                                    max={30}
                                    onChange={(value) => dispatch(setLegendStyles({  fontSize: value ?? 0 }))}
                                    value={typeof fontSize === 'number' ? fontSize : 0}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber
                                    min={10}
                                    max={30}
                                    value={fontSize}
                                    onChange={(value) => dispatch(setLegendStyles({  fontSize: value ?? 0 }))}
                                />
                            </Col>
                        </Flex>
                    </Form.Item> 
                </>           
            }          
        </div>
    )
}