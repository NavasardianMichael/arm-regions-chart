import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { REGIONS_IDS_LIST, REGIONS_INITIAL_OPTIONS } from 'helpers/constants/regions'
import { T_ActionPayloads, T_RegionsState } from './types'

const initialState: T_RegionsState = {
  byId: REGIONS_INITIAL_OPTIONS,
  allIds: REGIONS_IDS_LIST,
}

export const regionsSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setRegionOptions: (state, action: PayloadAction<T_ActionPayloads['setRegionOptions']>) => {
      const { id } = action.payload
      state.byId[id] = {
        ...state.byId[id],
        ...action.payload,
      }
    },
    setTexts: (state, action: PayloadAction<T_ActionPayloads['setTexts']>) => {
      state.allIds.forEach((id) => {
        state.byId[id].text = action.payload[id]
      })
    },
    setRegionsData: (state, action: PayloadAction<T_ActionPayloads['setRegionsData']>) => {
      state.allIds = action.payload.allIds
      state.byId = action.payload.byId
    },

  },
})

export const { setRegionOptions, setRegionsData, setTexts } = regionsSlice.actions

export default regionsSlice.reducer
