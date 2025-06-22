import { FC } from 'react'
import { Flex } from 'antd'
import Title from 'antd/es/typography/Title'
import { useTranslations } from 'hooks/useTranslations'
import { Langs } from './langs/Main'
import styles from './styles.module.css'

export const Header: FC = () => {
  const translations = useTranslations()
  return (
    <Flex justify="space-between" wrap='wrap' gap="large" align="center" className={styles.header}>
      <Flex wrap='wrap' gap="large" align="center">
        <img style={{ width: 80 }} src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" />
        <Title className={styles.title}>{translations.appTitle}</Title>
      </Flex>
      <Langs />
    </Flex>
  )
}
