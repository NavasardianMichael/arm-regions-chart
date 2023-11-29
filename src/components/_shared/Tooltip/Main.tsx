import { FC, PropsWithChildren } from 'react'
import { Tooltip as AntdTooltip } from 'antd'
import { TooltipPlacement } from 'antd/es/tooltip'

type Props = {
  show: boolean
  title: string
  placement?: TooltipPlacement
}

export const Tooltip: FC<PropsWithChildren<Props>> = ({ show = false, title, children, placement = 'top' }) => {

  if (!show) return <>{ children }</>

  return (
    <AntdTooltip placement={placement} title={title}>
      {children}
    </AntdTooltip>
  )
}
