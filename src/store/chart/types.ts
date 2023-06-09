export type T_ChartState = {
    styles: {
        borderColor: string
        showLegend: boolean
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
    setChartLegendStyles: Partial<T_ChartState['styles']>
}