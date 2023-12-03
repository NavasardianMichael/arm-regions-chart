import { FC } from 'react'
import { Col, Divider, Flex, Form, InputNumber, Slider, Switch } from 'antd'
import ColorPicker from 'antd/es/color-picker'
import Title from 'antd/es/typography/Title'
import { selectChartStyles } from 'store/chart/selectors'
import { setChartBorderStyles } from 'store/chart/slice'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'

type T_Props = {}

export const ChartBorderStyles: FC<T_Props> = () => {
  const dispatch = useTypedDispatch()
  const { border } = useTypedSelector(selectChartStyles)
  const translations = useTranslations()

  return (
    <>
      <Title level={5} style={{ marginTop: 0, marginBottom: 'var(--size-md)' }}>
        {translations.chartStylesBorder}
      </Title>
      <Form layout="horizontal">
        <Form.Item label={translations.chartStylesBorderShow}>
          <Switch onClick={() => dispatch(setChartBorderStyles({ show: !border.show }))} checked={border.show} />
        </Form.Item>
        {border.show && (
          <>
            <Form.Item label={translations.chartStylesBorderColor}>
              <ColorPicker value={border.color} onChange={(_, hex) => dispatch(setChartBorderStyles({ color: hex }))} />
            </Form.Item>
            <Form.Item label={translations.chartStylesBorderWidth}>
              <Flex gap="middle" style={{ width: 400 }}>
                <Col span={12}>
                  <Slider
                    min={1}
                    max={10}
                    onChange={(value) => dispatch(setChartBorderStyles({ width: value ?? 0 }))}
                    value={typeof border.width === 'number' ? border.width : 0}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    max={10}
                    value={border.width}
                    onChange={(value) => dispatch(setChartBorderStyles({ width: value ?? 0 }))}
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
