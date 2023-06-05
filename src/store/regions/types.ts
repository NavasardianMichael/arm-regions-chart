import { REGIONS_IDS, REGIONS_IDS_LIST } from "../../helpers/constants/regions";

export type T_RegionsState = {
    byId: {
        [key in keyof typeof REGIONS_IDS]: {
            id: keyof typeof REGIONS_IDS,
            fill: string
            text: string
        }
    }
    allIds: typeof REGIONS_IDS_LIST
}

export type T_RegionOptions = {
    id: typeof REGIONS_IDS[keyof typeof REGIONS_IDS],
    fill: string,
    text: string
}

export type T_ActionPayloads = {
    changeRegionOptions: Pick<T_RegionOptions, 'id'> & Partial<Exclude<T_RegionOptions, 'id'>>
}