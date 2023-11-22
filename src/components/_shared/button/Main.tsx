import { FC } from 'react'
import styles from './styles.module.css'
import { combineClassNames } from 'helpers/functions/commons'

type Props = JSX.IntrinsicElements['button']

export const Button: FC<Props> = ({ className, children, ...restProps }) => {
  return (
    <button {...restProps} className={combineClassNames(className, styles.button)}>
        {children}
    </button>
  )
}