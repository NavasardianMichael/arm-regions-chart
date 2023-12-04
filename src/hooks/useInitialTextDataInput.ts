import { useMemo } from 'react'
import { REGIONS_LOCALIZE_OPTIONS } from 'helpers/constants/localization'
import { REGIONS_IDS_LIST, REGIONS_INITIAL_OPTIONS } from 'helpers/constants/regions'
import { selectSelectedLanguage } from 'store/chart/selectors'
import { useTypedSelector } from './useTypedSelector'

export const useInitialTextDataInput = () => {
  const selectedLanguage = useTypedSelector(selectSelectedLanguage)

  const processedText = useMemo(() => {
    return REGIONS_IDS_LIST.reduce((result, id, i, arr) => {
      return (result += `${REGIONS_LOCALIZE_OPTIONS[selectedLanguage][id]}\t${REGIONS_INITIAL_OPTIONS[id].value}${
        i === arr.length - 1 ? '' : '\n'
      }`)
    }, '')
  }, [selectedLanguage])

  return processedText
}
