import { REGIONS_LOCALIZE_OPTIONS } from 'helpers/constants/localization'
import { selectSelectedLanguage } from 'store/chart/selectors'
import { useTypedSelector } from './useTypedSelector'

export const useTranslations = () => {
  const selectedLanguage = useTypedSelector(selectSelectedLanguage)

  return REGIONS_LOCALIZE_OPTIONS[selectedLanguage]
}
