import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { Flex, Select } from 'antd'
import { LANGS, REGIONS_LOCALIZE_OPTIONS } from 'helpers/constants/localization'
import { REGIONS_IDS_LIST } from 'helpers/constants/regions'
import { selectSelectedLanguage } from 'store/chart/selectors'
import { setLanguage } from 'store/chart/slice'
import { setTexts } from 'store/regions/slice'
import { T_ActionPayloads } from 'store/regions/types'
import { useTypedSelector } from 'hooks/useTypedSelector'

export const Langs: FC = () => {
  const dispatch = useDispatch()
  const selectedLanguage = useTypedSelector(selectSelectedLanguage)

  const handleLangugeChange = (newSelectedLanguage: typeof selectedLanguage) => {
    dispatch(setLanguage(newSelectedLanguage))
    const translatedTexts: T_ActionPayloads['setTexts'] = REGIONS_IDS_LIST.reduce(
      (acc, id) => {
        acc[id] = REGIONS_LOCALIZE_OPTIONS[newSelectedLanguage][id]
        return acc
      },
      {} as T_ActionPayloads['setTexts']
    )
    dispatch(setTexts(translatedTexts))
  }

  return (
    <Select onChange={handleLangugeChange} value={selectedLanguage} style={{ width: 130 }}>
      <Select.Option value={LANGS.am}>
        <Flex gap="small" align="center" style={{ textTransform: 'uppercase' }}>
          <img
            src={process.env.PUBLIC_URL + '/am.svg'}
            style={{ padding: 'var(--size-xs) 0', height: 20, width: 40, objectFit: 'cover' }}
            alt="Flag of Armenia"
          />
          {LANGS.am}
        </Flex>
      </Select.Option>
      <Select.Option value={LANGS.en}>
        <Flex gap="middle" align="center" style={{ textTransform: 'uppercase' }}>
          <img
            src={process.env.PUBLIC_URL + '/en.svg'}
            style={{ padding: 'var(--size-xs) 0', height: 20, width: 40, objectFit: 'cover' }}
            alt="Flag of Great Britatin"
          />
          {LANGS.en}
        </Flex>
      </Select.Option>
    </Select>
  )
}
