import { T_ChartState } from "../../store/chart/types"

export const LEGEND_INITIAL_ROW_IDS = ['initial-legend-row-id-1', 'initial-legend-row-id-2', 'initial-legend-row-id-3']

export const LEGEND_INITIAL_ROWS: T_ChartState['legend']['byId'] = {
  [LEGEND_INITIAL_ROW_IDS[0]]: {
    id: LEGEND_INITIAL_ROW_IDS[0],
    name: 'criteria 1',
    rangeStart: 0,
    rangeEnd: 100,
    color: '#add8e6',
},
[LEGEND_INITIAL_ROW_IDS[1]]: {
    id: LEGEND_INITIAL_ROW_IDS[1],
    name: 'criteria 2',
    rangeStart: 100,
    rangeEnd: 200,
    color: '#5757ff',
},
[LEGEND_INITIAL_ROW_IDS[2]]: {
    id: LEGEND_INITIAL_ROW_IDS[2],
    name: 'criteria 3',
    rangeStart: 200,
    rangeEnd: 300,
    color: '#00008b',
  },
}