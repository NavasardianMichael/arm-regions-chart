import { FC } from 'react'
import styles from './styles.module.css'

export const Header: FC = () => {
    return (
        <div className={styles.header}>
            <h1>Armenia Regions Map Generator</h1>
        </div>
    )
}