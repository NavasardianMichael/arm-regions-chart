import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import { T_ActionPayloads, T_RegionsState } from './types'
import { REGIONS_IDS_LIST, REGIONS_INITIAL_OPTIONS } from 'helpers/constants/regions'

const initialState: T_RegionsState = {
  byId: REGIONS_INITIAL_OPTIONS,
  allIds: REGIONS_IDS_LIST,
  draggedId: null
}

export const regionsSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setRegionOptions: (state, action: PayloadAction<T_ActionPayloads['changeRegionOptions']>) => {
      const { id } = action.payload
      state.byId[id] = {
        ...state.byId[id],
        ...action.payload
      }
    },
    setRegionsData: (state, action: PayloadAction<T_ActionPayloads['setRegionsData']>) => {      
      state.allIds = action.payload.allIds
      state.byId = action.payload.byId
    },
    setDraggedId: (state, action: PayloadAction<T_ActionPayloads['setDraggedId']>) => {
      state.draggedId = action.payload
    }
  },
})

export const { setRegionOptions, setRegionsData, setDraggedId } = regionsSlice.actions

export default regionsSlice.reducer