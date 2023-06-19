import { RootState } from "../..";

export const selectChartStyles = (state: RootState) => state.chart.styles
export const selectChartLegendOptions = (state: RootState) => state.chart.legend