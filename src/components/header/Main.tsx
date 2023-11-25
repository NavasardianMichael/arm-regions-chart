import { FC } from 'react'
import styles from './styles.module.css'
import Title from 'antd/es/typography/Title'
import { Flex, Image } from 'antd'
import { Langs } from './langs/Main'

export const Header: FC = () => {
    return (
        <Flex justify='space-between' align='center' className={styles.header}>
            <Flex gap='large' align='center'>
                <img style={{width: 80}} src={process.env.PUBLIC_URL + '/logo192.png'} alt='logo' />
                <Title className={styles.title}>Armenia Regions Map Generator</Title>
            </Flex>
            <Langs />
        </Flex>
    )
}