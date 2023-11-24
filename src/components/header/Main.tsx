import { FC } from 'react'
import styles from './styles.module.css'
import Title from 'antd/es/typography/Title'
import { Flex } from 'antd'

export const Header: FC = () => {
    return (
        <Flex className={styles.header}>
            <Title className={styles.title}>Armenia Regions Map Generator</Title>
        </Flex>
    )
}