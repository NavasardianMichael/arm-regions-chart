import { DeepPartial } from '@reduxjs/toolkit'
import { LEGEND_OPTION_NAMES } from 'helpers/constants/chart'
import { LANGS } from 'helpers/constants/localization'

export type T_ChartState = {
  selectedLanguage: (typeof LANGS)[keyof typeof LANGS]
  styles: {
    chart: {
      labels: {
        show: boolean
        color: string
        fontSize: number
      }
      border: {
        show: boolean
        color: string
        width: number
      }
      shadow: {
        show: boolean
        offset: number
        color: string
        blurred: number
      }
    }
    legend: {
      labels: {
        show: boolean
        color: string
        fontSize: number
      }
      border: {
        show: boolean
        color: string
        width: number
      }
      others: {
        outOfRangeColor: string
      }
    }
  }
  legend: {
    byId: Record<T_Legend['id'], T_Legend>
    allIds: T_Legend['id'][]
  }
}

export type T_Legend = {
  id: string
  [LEGEND_OPTION_NAMES.name]: string
  [LEGEND_OPTION_NAMES.rangeStart]: number
  [LEGEND_OPTION_NAMES.rangeEnd]: number
  [LEGEND_OPTION_NAMES.color]: string
}

export type T_ActionPayloads = {
  setChartLegends: T_ChartState['legend']
  setChartLegendOptions: Pick<T_Legend, 'id'> & Partial<Exclude<T_Legend, 'id'>>
  addChartLegend: Pick<T_Legend, 'id'>
  removeChartLegend: Pick<T_Legend, 'id'>
  setChartLabelsStyles: Partial<T_ChartState['styles']['chart']['labels']>
  setChartBorderStyles: Partial<T_ChartState['styles']['chart']['border']>
  setChartShadowStyles: Partial<T_ChartState['styles']['chart']['shadow']>
  setLegendLabelsStyles: Partial<T_ChartState['styles']['legend']['labels']>
  setLegendBorderStyles: Partial<T_ChartState['styles']['legend']['border']>
  setLegendOtherStyles: Partial<T_ChartState['styles']['legend']['others']>
  setLanguage: T_ChartState['selectedLanguage']
}
