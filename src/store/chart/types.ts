export type T_ChartState = {
    styles: {
        borderColor: string
    },
    legend: {
        byId: { [key: T_Legend['id']]: T_Legend }
        allIds: T_Legend['id'][]
    }
}

export type T_Legend = {
    id: string
    rangeStart: number
    rangeEnd: number
    color: string
}

export type T_ActionPayloads = {
    changeChartLegendOptions: Pick<T_Legend, 'id'> & Partial<Exclude<T_Legend, 'id'>>
}