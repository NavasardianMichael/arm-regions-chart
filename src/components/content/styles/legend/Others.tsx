import { FC } from 'react'
import { Form } from 'antd'
import ColorPicker from 'antd/es/color-picker'
import Title from 'antd/es/typography/Title'
import { selectLegendStyles } from 'store/chart/selectors'
import { setLegendOtherStyles } from 'store/chart/slice'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'

type T_Props = {}

export const LegendOtherStyles: FC<T_Props> = () => {
  const dispatch = useTypedDispatch()
  const {
    others: { outOfRangeColor },
  } = useTypedSelector(selectLegendStyles)
  const translations = useTranslations()

  return (
    <>
      <Title level={5} style={{ marginTop: 0, marginBottom: 'var(--size-md)' }}>
        {translations.legendStylesOthers}
      </Title>
      <Form layout="horizontal">
        <Form.Item label={translations.legendStylesOthersOutOfRangeColor}>
          <ColorPicker
            value={outOfRangeColor}
            onChange={(_, hex) => dispatch(setLegendOtherStyles({ outOfRangeColor: hex }))}
          />
        </Form.Item>
      </Form>
    </>
  )
}
