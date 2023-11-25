import { selectSelectedLanguage } from "store/chart/selectors"
import { useTypedSelector } from "./useTypedSelector"
import { REGIONS_LOCALIZE_OPTIONS } from "helpers/constants/localization"

export const useTranslation = () => {
    const selectedLanguage = useTypedSelector(selectSelectedLanguage)

    return REGIONS_LOCALIZE_OPTIONS[selectedLanguage]
}