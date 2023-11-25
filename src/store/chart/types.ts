export type T_ChartState = {
    styles: {
        chart: {
            color: string
            borderColor: string
            showLabels: boolean
            fontSize: number
        },
        legend: {
            color: string
            borderColor: string
            show: boolean
            fontSize: number
        }
    },
    legend: {
        byId: Record<T_Legend['id'], T_Legend>
        allIds: T_Legend['id'][]
    }
}

export type T_Legend = {
    id: string
    name: string
    rangeStart: number
    rangeEnd: number
    color: string
}

export type T_ActionPayloads = {
    setChartLegends: T_ChartState['legend']
    setChartLegendOptions: Pick<T_Legend, 'id'> & Partial<Exclude<T_Legend, 'id'>>
    addChartLegend: Pick<T_Legend, 'id'>
    removeChartLegend: Pick<T_Legend, 'id'>
    setChartStyles: Partial<T_ChartState['styles']['chart']>
    setLegendStyles: Partial<T_ChartState['styles']['legend']>
}