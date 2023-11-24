import { FC } from 'react';
import styles from './styles.module.css'
import TextArea from 'antd/es/input/TextArea';


type T_Props = {
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const TextFormat: FC<T_Props> = ({ value, onChange }) => {
  return (
    <TextArea
      aria-label="minimum height"
      rows={10}
      className={styles.textInput}
      placeholder='Insert tab delimited text here'
      value={value}
      onChange={onChange}
      style={{resize: 'none', padding: 'var(--size-xs) var(--size-sm)'}}
    />
  );
}