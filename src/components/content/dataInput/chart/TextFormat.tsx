import { FC } from 'react'
import TextArea from 'antd/es/input/TextArea'
import { useTranslations } from 'hooks/useTranslations'

type T_Props = {
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const TextFormat: FC<T_Props> = ({ value, onChange }) => {
  const translations = useTranslations()
  return (
    <TextArea
      aria-label="minimum height"
      rows={12}
      value={value}
      onChange={onChange}
      placeholder={translations.chartDataPlaceholder}
      style={{ resize: 'none', padding: 'var(--size-xs) var(--size-sm)' }}
    />
  )
}
