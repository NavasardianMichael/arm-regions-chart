import { FC } from 'react'
import { Col, Divider, Flex, Form, InputNumber, Slider, Switch } from 'antd'
import ColorPicker from 'antd/es/color-picker'
import Title from 'antd/es/typography/Title'
import { selectChartStyles } from 'store/chart/selectors'
import { useTranslations } from 'hooks/useTranslations'
import { useTypedDispatch } from 'hooks/useTypedDispatch'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { setChartLabelsStyles } from 'store/chart/slice'
import { ChartLabelStyles } from './Labels'
import { ChartBorderStyles } from './Border'
import { ChartShadowStyles } from './Shadow'

type T_Props = {}

export const ChartStyles: FC<T_Props> = () => {
  const dispatch = useTypedDispatch()
  const { labels } = useTypedSelector(selectChartStyles)
  const translations = useTranslations()

  return (
    <>
      <ChartLabelStyles />
      <ChartBorderStyles />
      <ChartShadowStyles />
    </>
  )
}
