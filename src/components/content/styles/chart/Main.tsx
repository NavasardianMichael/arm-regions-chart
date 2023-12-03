import { FC, memo } from 'react'
import { ChartBorderStyles } from './Border'
import { ChartLabelStyles } from './Labels'
import { ChartShadowStyles } from './Shadow'

type T_Props = {}

export const ChartStyles: FC<T_Props> = memo(() => {
  return (
    <>
      <ChartLabelStyles />
      <ChartBorderStyles />
      <ChartShadowStyles />
    </>
  )
})
