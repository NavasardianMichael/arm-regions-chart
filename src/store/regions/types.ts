import { REGIONS_LOCALIZE_OPTIONS } from "helpers/constants/localization"
import { REGIONS_IDS, REGIONS_IDS_LIST } from "helpers/constants/regions"

export type T_RegionsState = {
    byId: {
        [key in keyof typeof REGIONS_IDS]: T_RegionOptions
    }
    allIds: typeof REGIONS_IDS_LIST
    draggedId: T_RegionOptions['id'] | null
}

export type T_RegionOptions = {
    id: typeof REGIONS_IDS[keyof typeof REGIONS_IDS]
    text: string
    value: number
    label: {
        xPos: number
        yPos: number
    }
}

export type T_ActionPayloads = {
    changeRegionOptions: Pick<T_RegionOptions, 'id'> & Partial<Exclude<T_RegionOptions, 'id'>>
    setRegionsData: T_RegionsState
    setDraggedId: T_RegionsState['draggedId']
    setTexts: Record<T_RegionOptions['id'], string>
}