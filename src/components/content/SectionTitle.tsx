import { FC } from 'react'
import Title from 'antd/es/typography/Title'

type Props = {
  text: string
}

export const SectionTitle: FC<Props> = ({ text }) => {
  return (
    <Title style={{ margin: '0 0 0 8px', textAlign: 'left', textTransform: 'uppercase', fontSize: 14 }} level={5}>
      {text}
    </Title>
  )
}
