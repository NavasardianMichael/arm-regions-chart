import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { T_ActionPayloads, T_ChartState } from './types'
import { LEGEND_INITIAL_ROWS, LEGEND_INITIAL_ROW_IDS } from 'helpers/constants/chart'
import { LANGS } from 'helpers/constants/localization'

const initialState: T_ChartState = {
  styles: {
    chart: {
      borderColor: '#fff',
      showLabels: true,
      fontSize: 16,
      color: '#000'
    },
    legend: {
      borderColor: '#fff',
      show: true,
      fontSize: 16,
      color: '#000'
    },
  },
  legend: {
    byId: LEGEND_INITIAL_ROWS,
    allIds: LEGEND_INITIAL_ROW_IDS
  },
  selectedLanguage: LANGS.am
}

export const chartSlice = createSlice({
  name: 'legend',
  initialState,
  reducers: {
    setChartLegends: (state, action: PayloadAction<T_ActionPayloads['setChartLegends']>) => {
      state.legend = action.payload
    },
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
    setChartStyles: (state, action: PayloadAction<T_ActionPayloads['setChartStyles']>) => {
      state.styles.chart = {
        ...state.styles.chart,
        ...action.payload
      }
    },
    setLegendStyles: (state, action: PayloadAction<T_ActionPayloads['setLegendStyles']>) => {
      state.styles.legend = {
        ...state.styles.legend,
        ...action.payload
      }
    },
    setLanguage: (state, action: PayloadAction<T_ActionPayloads['setLanguage']>) => {
      state.selectedLanguage = action.payload
    }
  },
})

export const { setChartLegends, setChartLegendOptions, addChartLegend, removeChartLegend, setChartStyles, setLegendStyles, setLanguage } = chartSlice.actions

export default chartSlice.reducer