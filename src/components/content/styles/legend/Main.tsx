import { FC } from 'react'
import { LegendBorderStyles } from './Border'
import { LegendLabelStyles } from './Labels'

type T_Props = {}

export const LegendStyles: FC<T_Props> = () => {
  return (
    <>
      <LegendLabelStyles />
      <LegendBorderStyles />
    </>
  )
}
