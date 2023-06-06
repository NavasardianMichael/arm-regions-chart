import { T_RegionsState } from "../../store/regions/types";
import { LANGS_IDS } from "./localization"

export const REGIONS_IDS = {
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

export const REGIONS_IDS_LIST = Object.values(REGIONS_IDS)

export const REGIONS_LOCALIZE_OPTIONS = {
    [LANGS_IDS.en]: {
        [REGIONS_IDS.aragatsotn]: 'Aragatsotn',
        [REGIONS_IDS.ararat]: 'Artashat',
        [REGIONS_IDS.armavir]: 'Armavir',
        [REGIONS_IDS.yerevan]: 'Yerevan',
        [REGIONS_IDS.gegharquniq]: 'Gegharquniq',
        [REGIONS_IDS.kotayk]: 'Kotayk',
        [REGIONS_IDS.lori]: 'Lori',
        [REGIONS_IDS.shirak]: 'Shirak',
        [REGIONS_IDS.syunik]: 'Syunik',
        [REGIONS_IDS.tavush]: 'Tavush',
        [REGIONS_IDS.vayotsDzor]: 'Vayots dzor',
    },
    [LANGS_IDS.am]: {
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
        [REGIONS_IDS.vayotsDzor]: 'Վայոց ձոր',
    },
}

export const REGIONS_INITIAL_FILL = '#f00000';

export const REGIONS_INITIAL_OPTIONS: T_RegionsState['byId'] = {
    [REGIONS_IDS.aragatsotn]: {
        id: REGIONS_IDS.aragatsotn,
        fill: REGIONS_INITIAL_FILL,
        text: REGIONS_LOCALIZE_OPTIONS[LANGS_IDS.en][REGIONS_IDS.aragatsotn],
        value: 0
    },
    [REGIONS_IDS.ararat]: {
        id: REGIONS_IDS.ararat,
        fill: REGIONS_INITIAL_FILL,
        text: REGIONS_LOCALIZE_OPTIONS[LANGS_IDS.en][REGIONS_IDS.ararat],
        value: 0
    },
    [REGIONS_IDS.armavir]: {
        id: REGIONS_IDS.armavir,
        fill: REGIONS_INITIAL_FILL,
        text: REGIONS_LOCALIZE_OPTIONS[LANGS_IDS.en][REGIONS_IDS.armavir],
        value: 0
    },
    [REGIONS_IDS.yerevan]: {
        id: REGIONS_IDS.yerevan,
        fill: REGIONS_INITIAL_FILL,
        text: REGIONS_LOCALIZE_OPTIONS[LANGS_IDS.en][REGIONS_IDS.yerevan],
        value: 0
    },
    [REGIONS_IDS.gegharquniq]: {
        id: REGIONS_IDS.gegharquniq,
        fill: REGIONS_INITIAL_FILL,
        text: REGIONS_LOCALIZE_OPTIONS[LANGS_IDS.en][REGIONS_IDS.gegharquniq],
        value: 0
    },
    [REGIONS_IDS.kotayk]: {
        id: REGIONS_IDS.kotayk,
        fill: REGIONS_INITIAL_FILL,
        text: REGIONS_LOCALIZE_OPTIONS[LANGS_IDS.en][REGIONS_IDS.kotayk],
        value: 0
    },
    [REGIONS_IDS.lori]: {
        id: REGIONS_IDS.lori,
        fill: REGIONS_INITIAL_FILL,
        text: REGIONS_LOCALIZE_OPTIONS[LANGS_IDS.en][REGIONS_IDS.lori],
        value: 0
    },
    [REGIONS_IDS.shirak]: {
        id: REGIONS_IDS.shirak,
        fill: REGIONS_INITIAL_FILL,
        text: REGIONS_LOCALIZE_OPTIONS[LANGS_IDS.en][REGIONS_IDS.shirak],
        value: 0
    },
    [REGIONS_IDS.syunik]: {
        id: REGIONS_IDS.syunik,
        fill: REGIONS_INITIAL_FILL,
        text: REGIONS_LOCALIZE_OPTIONS[LANGS_IDS.en][REGIONS_IDS.syunik],
        value: 0
    },
    [REGIONS_IDS.tavush]: {
        id: REGIONS_IDS.tavush,
        fill: REGIONS_INITIAL_FILL,
        text: REGIONS_LOCALIZE_OPTIONS[LANGS_IDS.en][REGIONS_IDS.tavush],
        value: 0
    },
    [REGIONS_IDS.vayotsDzor]: {
        id: REGIONS_IDS.vayotsDzor,
        fill: REGIONS_INITIAL_FILL,
        text: REGIONS_LOCALIZE_OPTIONS[LANGS_IDS.en][REGIONS_IDS.vayotsDzor],
        value: 0
    },
} as const