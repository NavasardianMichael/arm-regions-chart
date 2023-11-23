import { FC } from 'react';
import styles from './styles.module.css'


type T_Props = {
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const TextFormat: FC<T_Props> = ({ value, onChange }) => {
  return (
    <textarea
      aria-label="minimum height"
      rows={10}
      className={styles.textInput}
      placeholder='Insert tab delimited data here'
      value={value}
      onChange={onChange}
    />
  );
}