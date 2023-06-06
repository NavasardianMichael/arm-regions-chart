import { createSlice } from '@reduxjs/toolkit'

import type { PayloadAction } from '@reduxjs/toolkit'
import { T_ActionPayloads, T_RegionsState } from './types'
import { REGIONS_IDS_LIST, REGIONS_INITIAL_OPTIONS } from '../../helpers/constants/regions'

const initialState: T_RegionsState = {
  byId: REGIONS_INITIAL_OPTIONS,
  allIds: REGIONS_IDS_LIST
}

export const regionsSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    setRegionOptions: (state, action: PayloadAction<T_ActionPayloads['changeRegionOptions']>) => {
      const { id } = action.payload
      state.byId[id] = {
        ...state.byId[id],
        ...action.payload
      }
    },
  },
})

export const { setRegionOptions } = regionsSlice.actions

export default regionsSlice.reducer