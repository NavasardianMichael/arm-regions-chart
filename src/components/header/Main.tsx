import { FC } from 'react'
import { Flex } from 'antd'
import Title from 'antd/es/typography/Title'
import { Langs } from './langs/Main'
import styles from './styles.module.css'
import { useTranslations } from 'hooks/useTranslations'

export const Header: FC = () => {
  const translations = useTranslations()
  return (
    <Flex justify="space-between" align="center" className={styles.header}>
      <Flex gap="large" align="center">
        <img style={{ width: 80 }} src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" />
        <Title className={styles.title}>{translations.appTitle}</Title>
      </Flex>
      <Langs />
    </Flex>
  )
}
