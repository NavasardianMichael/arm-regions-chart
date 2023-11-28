import { FC } from 'react'
import { ChartBorderStyles } from './Border'
import { ChartLabelStyles } from './Labels'
import { ChartShadowStyles } from './Shadow'

type T_Props = {}

export const ChartStyles: FC<T_Props> = () => {
  return (
    <>
      <ChartLabelStyles />
      <ChartBorderStyles />
      <ChartShadowStyles />
    </>
  )
}
