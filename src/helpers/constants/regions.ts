import { LANGS_LIST } from "./localization"

const REGIONS_LIST = {
    aragatsotn: 'aragatsotn',
    ararat: 'ararat',
    armavir: 'armavir',
    yerevan: 'yerevan',
    gegharquniq: 'gegharquniq',
    kotayk: 'kotayk',
    lori: 'lori',
    shirak: 'shirak',
    syunik: 'syunik',
    tavush: 'tavush',
    vayotsDzor: 'vayotsDzor',
} as const

export const REGIONS = {
    localizedOptions: {
        [LANGS_LIST.en]: {
            [REGIONS_LIST.aragatsotn]: 'Aragatsotn',
            [REGIONS_LIST.ararat]: 'Artashat',
            [REGIONS_LIST.armavir]: 'Armavir',
            [REGIONS_LIST.yerevan]: 'Yerevan',
            [REGIONS_LIST.gegharquniq]: 'Gegharquniq',
            [REGIONS_LIST.kotayk]: 'Kotayk',
            [REGIONS_LIST.lori]: 'Lori',
            [REGIONS_LIST.shirak]: 'Shirak',
            [REGIONS_LIST.syunik]: 'Syunik',
            [REGIONS_LIST.vayotsDzor]: 'Vayots dzor',
        },
        [LANGS_LIST.am]: {
            [REGIONS_LIST.aragatsotn]: 'Արագածոտն',
            [REGIONS_LIST.ararat]: 'Արարատ',
            [REGIONS_LIST.armavir]: 'Արմավիր',
            [REGIONS_LIST.yerevan]: 'Երևան',
            [REGIONS_LIST.gegharquniq]: 'Գեղարքունիք',
            [REGIONS_LIST.kotayk]: 'Կոտայք',
            [REGIONS_LIST.lori]: 'Լոռի',
            [REGIONS_LIST.shirak]: 'Շիրակ',
            [REGIONS_LIST.syunik]: 'Սյունիք',
            [REGIONS_LIST.vayotsDzor]: 'Վայոց ձոր',
        },
    },
    commonOptions: {
        [REGIONS_LIST.aragatsotn]: {
            id: REGIONS_LIST.aragatsotn,
            fill: 'none' 
        },
        [REGIONS_LIST.ararat]: {
            id: REGIONS_LIST.ararat,
            fill: 'none' 
        },
        [REGIONS_LIST.armavir]: {
            id: REGIONS_LIST.armavir,
            fill: 'none' 
        },
        [REGIONS_LIST.yerevan]: {
            id: REGIONS_LIST.yerevan,
            fill: 'none' 
        },
        [REGIONS_LIST.gegharquniq]: {
            id: REGIONS_LIST.gegharquniq,
            fill: 'none' 
        },
        [REGIONS_LIST.kotayk]: {
            id: REGIONS_LIST.kotayk,
            fill: 'none' 
        },
        [REGIONS_LIST.lori]: {
            id: REGIONS_LIST.lori,
            fill: 'none' 
        },
        [REGIONS_LIST.shirak]: {
            id: REGIONS_LIST.shirak,
            fill: 'none' 
        },
        [REGIONS_LIST.syunik]: {
            id: REGIONS_LIST.syunik,
            fill: 'none' 
        },
        [REGIONS_LIST.vayotsDzor]: {
            id: REGIONS_LIST.vayotsDzor,
            fill: 'none' 
        },
    }
}