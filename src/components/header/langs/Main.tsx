import { Flex, Select } from 'antd'
import { LANGS } from 'helpers/constants/localization'
import { useTypedSelector } from 'hooks/useTypedSelector'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { selectSelectedLanguage } from 'store/chart/selectors'
import { setLanguage } from 'store/chart/slice'

export const Langs: FC = () => {

    const dispatch = useDispatch()
    const selectedLanguage = useTypedSelector(selectSelectedLanguage)

    const handleLangugeChange = (v: typeof selectedLanguage) => {
      dispatch(setLanguage(v))
    }

    return (
        <Select
            onChange={handleLangugeChange}
            value={selectedLanguage}
            style={{width: 130}}
        >
            <Select.Option value={LANGS.am}>
                <Flex gap='small' align='center' style={{textTransform: 'uppercase'}}>
                    <img 
                        src={process.env.PUBLIC_URL + '/am.svg'} 
                        style={{padding: 'var(--size-xs) 0', height: 20, width: 40}} 
                        alt='Flag of Armenia'
                    />
                    {LANGS.am}
                </Flex>
            </Select.Option>
            <Select.Option value={LANGS.en}>
                <Flex gap='middle' align='center' style={{textTransform: 'uppercase'}}>
                    <img 
                        src={process.env.PUBLIC_URL + '/en.svg'} 
                        style={{padding: 'var(--size-xs) 0', height: 20, width: 40}} 
                        alt='Flag of Great Britatin' 
                    />
                    {LANGS.en}
                </Flex>
            </Select.Option>
        </Select>
    )
}