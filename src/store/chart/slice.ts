import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { T_ActionPayloads, T_ChartState } from './types'
import { LEGEND_INITIAL_ROWS, LEGEND_INITIAL_ROW_IDS } from '../../helpers/constants/chart'

const initialState: T_ChartState = {
  styles: {
    borderColor: 'gray'
  },
  legend: {
    byId: LEGEND_INITIAL_ROWS,
    allIds: LEGEND_INITIAL_ROW_IDS
  }
}

export const chartSlice = createSlice({
  name: 'legend',
  initialState,
  reducers: {
    setChartLegendOptions: (state, action: PayloadAction<T_ActionPayloads['changeChartLegendOptions']>) => {
      const { id } = action.payload
      state.legend.byId[id] = {
        ...state.legend.byId[id],
        ...action.payload
      }
    },
  },
})

export const { setChartLegendOptions } = chartSlice.actions

export default chartSlice.reducer