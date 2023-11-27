import { FC } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { useTranslations } from 'hooks/useTranslations'
import styles from './styles.module.css'

type T_Props = {
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const TextFormat: FC<T_Props> = ({ value, onChange }) => {
  const translations = useTranslations()
  return (
    <TextArea
      aria-label='minimum height'
      rows={10}
      className={styles.textInput}
      placeholder={translations.chartDataPlaceholder}
      value={value}
      onChange={onChange}
      style={{ resize: 'none', padding: 'var(--size-xs) var(--size-sm)' }}
    />
  )
}
