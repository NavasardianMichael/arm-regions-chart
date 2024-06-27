import { REGIONS_IDS } from 'helpers/constants/localization'
import { REGIONS_IDS_LIST } from 'helpers/constants/regions'

export type T_RegionsState = {
  byId: Record<keyof typeof REGIONS_IDS, T_RegionOptions>
  allIds: typeof REGIONS_IDS_LIST
}

export type T_RegionOptions = {
  id: (typeof REGIONS_IDS)[keyof typeof REGIONS_IDS]
  text: string
  value: number
  label: {
    xPos: number
    yPos: number
  }
}

export type T_ActionPayloads = {
  setRegionsData: T_RegionsState
  setRegionOptions: Pick<T_RegionOptions, 'id'> & Partial<Exclude<T_RegionOptions, 'id'>>
  setTexts: Record<T_RegionOptions['id'], string>
}
