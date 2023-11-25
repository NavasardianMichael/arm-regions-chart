import { REGIONS_IDS } from "./regions"

export const LANGS = {
  am: 'am',
  en: 'en',
} as const

export const REGIONS_LOCALIZE_OPTIONS = {
    [LANGS.en]: {
        [REGIONS_IDS.aragatsotn]: 'Aragatsotn',
        [REGIONS_IDS.ararat]: 'Ararat',
        [REGIONS_IDS.armavir]: 'Armavir',
        [REGIONS_IDS.yerevan]: 'Yerevan',
        [REGIONS_IDS.gegharquniq]: 'Gegharquniq',
        [REGIONS_IDS.kotayk]: 'Kotayk',
        [REGIONS_IDS.lori]: 'Lori',
        [REGIONS_IDS.shirak]: 'Shirak',
        [REGIONS_IDS.syunik]: 'Syunik',
        [REGIONS_IDS.tavush]: 'Tavush',
        [REGIONS_IDS.vayotsdzor]: 'Vayots dzor',
        chartData: 'Chart data'
    },
    [LANGS.am]: {
        [REGIONS_IDS.aragatsotn]: 'Արագածոտն',
        [REGIONS_IDS.ararat]: 'Արարատ',
        [REGIONS_IDS.armavir]: 'Արմավիր',
        [REGIONS_IDS.yerevan]: 'Երևան',
        [REGIONS_IDS.gegharquniq]: 'Գեղարքունիք',
        [REGIONS_IDS.kotayk]: 'Կոտայք',
        [REGIONS_IDS.lori]: 'Լոռի',
        [REGIONS_IDS.shirak]: 'Շիրակ',
        [REGIONS_IDS.syunik]: 'Սյունիք',
        [REGIONS_IDS.tavush]: 'Տավուշ',
        [REGIONS_IDS.vayotsdzor]: 'Վայոց ձոր',
        chartData: 'Հիմնական տվյալներ'
    },
} as const