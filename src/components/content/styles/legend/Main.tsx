import { FC } from 'react'
import { Col, Flex, Form, InputNumber, Slider, Switch } from 'antd'
import ColorPicker from 'antd/es/color-picker'
import { selectLegendStyles } from 'store/chart/selectors'
import { setLegendStyles } from 'store/chart/slice'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'

type T_Props = {}

export const LegendStyles: FC<T_Props> = () => {
  const dispatch = useTypedDispatch()
  const { show, fontSize, color } = useTypedSelector(selectLegendStyles)
  const translations = useTranslations()

  return (
    <>
      <Form.Item label={translations.chartStylesShowLabels}>
        <Switch onClick={() => dispatch(setLegendStyles({ show: !show }))} checked={show} />
      </Form.Item>
      {show && (
        <>
          <Form.Item label={translations.chartStylesTextColor}>
            <ColorPicker value={color} onChange={(_, hex) => dispatch(setLegendStyles({ color: hex }))} />
          </Form.Item>
          <Form.Item label={translations.chartStylesFontSize}>
            <Flex gap="middle" style={{ width: 400 }}>
              <Col span={12}>
                <Slider
                  min={10}
                  max={30}
                  onChange={(value) => dispatch(setLegendStyles({ fontSize: value ?? 0 }))}
                  value={typeof fontSize === 'number' ? fontSize : 0}
                />
              </Col>
              <Col span={4}>
                <InputNumber
                  min={10}
                  max={30}
                  value={fontSize}
                  onChange={(value) => dispatch(setLegendStyles({ fontSize: value ?? 0 }))}
                />
              </Col>
            </Flex>
          </Form.Item>
        </>
      )}
    </>
  )
}
