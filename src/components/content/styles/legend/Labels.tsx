import { FC } from 'react'
import { Col, Divider, Flex, Form, InputNumber, Slider, Switch } from 'antd'
import ColorPicker from 'antd/es/color-picker'
import Title from 'antd/es/typography/Title'
import { selectLegendStyles } from 'store/chart/selectors'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { setLegendLabelsStyles } from 'store/chart/slice'

type T_Props = {}

export const LegendLabelStyles: FC<T_Props> = () => {
  const dispatch = useTypedDispatch()
  const { labels } = useTypedSelector(selectLegendStyles)
  const translations = useTranslations()

  return (
    <>
      <Title level={5} style={{ marginTop: 0, marginBottom: 'var(--size-md)' }}>
        {translations.legendStylesLabels}
      </Title>
      <Form layout="horizontal">
        <Form.Item label={translations.chartStylesShowLabels}>
          <Switch onClick={() => dispatch(setLegendLabelsStyles({ show: !labels.show }))} checked={labels.show} />
        </Form.Item>
        {labels.show && (
          <>
            <Form.Item label={translations.chartStylesTextColor}>
              <ColorPicker value={labels.color} onChange={(_, hex) => dispatch(setLegendLabelsStyles({ color: hex }))} />
            </Form.Item>
            <Form.Item label={translations.chartStylesFontSize}>
              <Flex gap="middle" style={{ width: 400 }}>
                <Col span={12}>
                  <Slider
                    min={10}
                    max={30}
                    onChange={(value) => dispatch(setLegendLabelsStyles({ fontSize: value ?? 0 }))}
                    value={typeof labels.fontSize === 'number' ? labels.fontSize : 0}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={10}
                    max={30}
                    value={labels.fontSize}
                    onChange={(value) => dispatch(setLegendLabelsStyles({ fontSize: value ?? 0 }))}
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
