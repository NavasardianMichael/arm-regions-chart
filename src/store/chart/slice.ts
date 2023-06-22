import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { T_ActionPayloads, T_ChartState } from './types'
import { LEGEND_INITIAL_ROWS, LEGEND_INITIAL_ROW_IDS } from '../../helpers/constants/chart'

const initialState: T_ChartState = {
  styles: {
    borderColor: 'gray',
    showLegend: true,
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
    setChartLegendOptions: (state, action: PayloadAction<T_ActionPayloads['setChartLegendOptions']>) => {
      const { id } = action.payload
      state.legend.byId[id] = {
        ...state.legend.byId[id],
        ...action.payload
      }
    },
    addChartLegend: (state, action: PayloadAction<T_ActionPayloads['addChartLegend']>) => {
      const { id } = action.payload
      const lastRange = state.legend.byId[state.legend.allIds[state.legend.allIds.length - 1]];
      
      state.legend.allIds.push(id)
      state.legend.byId[id] = {
        id,
        name: lastRange.rangeEnd + ' - ' + (lastRange.rangeEnd + (lastRange.rangeEnd - lastRange.rangeStart)),
        color: '#ffffff',
        rangeStart: lastRange.rangeEnd,
        rangeEnd: lastRange.rangeEnd + (lastRange.rangeEnd - lastRange.rangeStart),
      }
    },
    removeChartLegend: (state, action: PayloadAction<T_ActionPayloads['removeChartLegend']>) => {
      const { id } = action.payload
      
      state.legend.allIds = state.legend.allIds.filter(currentId => currentId !== id)
      delete state.legend.byId[id]
    },
    setChartLegendStyles: (state, action: PayloadAction<T_ActionPayloads['setChartLegendStyles']>) => {
      state.styles = {
        ...state.styles,
        ...action.payload
      }
    }
  },
})

export const { setChartLegendOptions, addChartLegend, removeChartLegend, setChartLegendStyles } = chartSlice.actions

export default chartSlice.reducer