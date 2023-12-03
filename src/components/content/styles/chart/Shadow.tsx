import { FC } from 'react'
import { Col, Divider, Flex, Form, InputNumber, Slider, Switch } from 'antd'
import ColorPicker from 'antd/es/color-picker'
import Title from 'antd/es/typography/Title'
import { selectChartStyles } from 'store/chart/selectors'
import { setChartShadowStyles } from 'store/chart/slice'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'

type T_Props = {}

export const ChartShadowStyles: FC<T_Props> = () => {
  const dispatch = useTypedDispatch()
  const { shadow } = useTypedSelector(selectChartStyles)
  const translations = useTranslations()

  return (
    <>
      <Title level={5} style={{ marginTop: 0, marginBottom: 'var(--size-md)' }}>
        {translations.chartStylesShadow}
      </Title>
      <Form>
        <Form.Item label={translations.chartStylesShadowShow}>
          <Switch onClick={() => dispatch(setChartShadowStyles({ show: !shadow.show }))} checked={shadow.show} />
        </Form.Item>
        {shadow.show && (
          <>
            <Form.Item label={translations.chartStylesShadowColor}>
              <ColorPicker value={shadow.color} onChange={(_, hex) => dispatch(setChartShadowStyles({ color: hex }))} />
            </Form.Item>
            <Form.Item label={translations.chartStylesShadowOffset}>
              <Flex gap="middle" style={{ width: 400 }}>
                <Col span={12}>
                  <Slider
                    min={1}
                    max={10}
                    onChange={(value) => dispatch(setChartShadowStyles({ offset: value ?? 0 }))}
                    value={typeof shadow.offset === 'number' ? shadow.offset : 0}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    max={10}
                    value={shadow.offset}
                    onChange={(value) => dispatch(setChartShadowStyles({ offset: value ?? 0 }))}
                  />
                </Col>
              </Flex>
            </Form.Item>
            <Form.Item label={translations.chartStylesShadowBlurred}>
              <Flex gap="middle" style={{ width: 400 }}>
                <Col span={12}>
                  <Slider
                    min={1}
                    max={10}
                    onChange={(value) => dispatch(setChartShadowStyles({ blurred: value ?? 0 }))}
                    value={typeof shadow.blurred === 'number' ? shadow.blurred : 0}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    max={10}
                    value={shadow.blurred}
                    onChange={(value) => dispatch(setChartShadowStyles({ blurred: value ?? 0 }))}
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
