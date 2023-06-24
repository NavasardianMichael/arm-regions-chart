import { T_ChartState } from "store/chart/types"

export const LEGEND_INITIAL_ROW_IDS = ['initial-legend-row-id-1', 'initial-legend-row-id-2', 'initial-legend-row-id-3']

export const LEGEND_INITIAL_ROWS: T_ChartState['legend']['byId'] = {
  [LEGEND_INITIAL_ROW_IDS[0]]: {
    id: LEGEND_INITIAL_ROW_IDS[0],
    name: '0 - 100',
    rangeStart: 0,
    rangeEnd: 100,
    color: '#e7eff6',
},
[LEGEND_INITIAL_ROW_IDS[1]]: {
    id: LEGEND_INITIAL_ROW_IDS[1],
    name: '100 - 200',
    rangeStart: 100,
    rangeEnd: 200,
    color: '#adcbe3',
},
[LEGEND_INITIAL_ROW_IDS[2]]: {
    id: LEGEND_INITIAL_ROW_IDS[2],
    name: '200 - 300',
    rangeStart: 200,
    rangeEnd: 300,
    color: '#63ace5',
  },
}