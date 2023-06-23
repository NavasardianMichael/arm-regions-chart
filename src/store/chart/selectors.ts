import { RootState } from "index"

export const selectChart = (state: RootState) => state.chart
export const selectChartStyles = (state: RootState) => state.chart.styles
export const selectChartLegendOptions = (state: RootState) => state.chart.legend