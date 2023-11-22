import { FC } from 'react';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import styles from './styles.module.css'


type T_Props = {
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export const TextFormat: FC<T_Props> = ({ value, onChange }) => {
  return (
    <TextareaAutosize
      aria-label="minimum height"
      minRows={13}
      className={styles.textInput}
      placeholder='Insert tab delimited data here'
      value={value}
      onChange={onChange}
    />
  );
}