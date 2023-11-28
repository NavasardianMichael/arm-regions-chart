import { FC } from 'react'
import { Col, Divider, Flex, Form, InputNumber, Slider, Switch } from 'antd'
import ColorPicker from 'antd/es/color-picker'
import Title from 'antd/es/typography/Title'
import { selectLegendStyles } from 'store/chart/selectors'
import { setLegendBorderStyles } from 'store/chart/slice'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'

type T_Props = {}

export const LegendBorderStyles: FC<T_Props> = () => {
  const dispatch = useTypedDispatch()
  const { border } = useTypedSelector(selectLegendStyles)
  const translations = useTranslations()

  return (
    <>
      <Title level={5} style={{ marginTop: 0, marginBottom: 'var(--size-md)' }}>
        {translations.legendStylesBorder}
      </Title>
      <Form layout="horizontal">
        <Form.Item label={translations.chartStylesShowLabels}>
          <Switch onClick={() => dispatch(setLegendBorderStyles({ show: !border.show }))} checked={border.show} />
        </Form.Item>
        {border.show && (
          <>
            <Form.Item label={translations.chartStylesTextColor}>
              <ColorPicker value={border.color} onChange={(_, hex) => dispatch(setLegendBorderStyles({ color: hex }))} />
            </Form.Item>
            <Form.Item label={translations.chartStylesFontSize}>
              <Flex gap="middle" style={{ width: 400 }}>
                <Col span={12}>
                  <Slider
                    min={1}
                    max={10}
                    onChange={(value) => dispatch(setLegendBorderStyles({ width: value ?? 0 }))}
                    value={typeof border.width === 'number' ? border.width : 0}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    max={10}
                    value={border.width}
                    onChange={(value) => dispatch(setLegendBorderStyles({ width: value ?? 0 }))}
                  />
                </Col>
              </Flex>
            </Form.Item>
          </>
        )}
      </Form>
      <Divider />
    </>
  )
}
