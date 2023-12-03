import { FC, memo } from 'react'
import { LegendBorderStyles } from './Border'
import { LegendLabelStyles } from './Labels'
import { LegendOtherStyles } from './Others'

type T_Props = {}

export const LegendStyles: FC<T_Props> = memo(() => {
  return (
    <>
      <LegendLabelStyles />
      <LegendBorderStyles />
      <LegendOtherStyles />
    </>
  )
})
