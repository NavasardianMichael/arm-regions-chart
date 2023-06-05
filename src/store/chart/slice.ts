import { createSlice } from '@reduxjs/toolkit'

import { T_ChartState } from './types'

const initialState: T_ChartState = {
  borderColor: 'gray'
}

export const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {},
})

// export const { setRegionOptions } = chartSlice.caseReducers

export default chartSlice.reducer