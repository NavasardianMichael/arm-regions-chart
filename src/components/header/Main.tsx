import { FC } from 'react'
import styles from './styles.module.css'
import Title from 'antd/es/typography/Title'

export const Header: FC = () => {
    return (
        <div className={styles.header}>
            <Title className={styles.title}>Armenia Regions Map Generator</Title>
        </div>
    )
}