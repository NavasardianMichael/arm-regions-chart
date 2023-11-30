import { FC } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { combineClassNames } from 'helpers/functions/commons'
import { useTranslations } from 'hooks/useTranslations'
import styles from './styles.module.css'

type T_Props = {
  formatError: string
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const TextFormat: FC<T_Props> = ({ formatError, value, onChange }) => {
  const translations = useTranslations()
  return (
    <TextArea
      aria-label="minimum height"
      rows={10}
      className={combineClassNames(styles.textInput, !!formatError ? styles.error : undefined)}
      placeholder={
        !!formatError ? 
        'The data you entered cannot be formatted, please ensure it matches the expected pattern.' : 
        translations.chartDataPlaceholder
      }
      value={value}
      onChange={onChange}
      style={{ resize: 'none', padding: 'var(--size-xs) var(--size-sm)' }}
      status={formatError ? 'error' : undefined}
    />
  )
}
