import { FC } from 'react'
import { T_RegionOptions, T_RegionsState } from 'store/regions/types'
import { T_ChartState } from 'store/chart/types'
import { REGIONS_IDS_LIST, REGIONS_TEMPLATE } from 'helpers/constants/regions'
import { Legend } from 'components/legend/Main'
import styles from './styles.module.css'

type T_Props = {
    data: T_RegionsState,
    chart: T_ChartState
}

export const Chart: FC<T_Props> = ({ data, chart }) => {

    const { legend: legendOptions } = chart

    const getColorByLegendOption = (value: T_RegionOptions['value']) => {
        console.log({legendOptions});
        
        let color = ''; 
        for(let i = 0; i < legendOptions.allIds.length; i++) {
            const legend = legendOptions.byId[legendOptions.allIds[i]]
            if(
                value >= legend.rangeStart &&
                value <= legend.rangeEnd
            ) {
                color = legend.color
                break;
            }
        }

        const firstLegendOption = legendOptions.byId[legendOptions.allIds[0]];
        const lastLegendOption = legendOptions.byId[legendOptions.allIds[legendOptions.allIds.length - 1]];

        if(!color) {
            if(value <= firstLegendOption.rangeEnd) color = firstLegendOption.color
            if(value >= lastLegendOption.rangeStart) color = lastLegendOption.color
        }
        return color
    } 
    console.log({data})
    return (
        <div
            className={styles.chart}
            id="chart"
        >
            <canvas id="canvas" width="792.57129" height="802.40002" hidden></canvas>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="map"
                width="792.57129"
                height="802.40002"
                viewBox="0 0 792.57129 802.40002"
            >
                {
                    REGIONS_IDS_LIST.map(id => {
                        
                        return (
                            <path 
                                key={id} 
                                id={id}
                                fill={getColorByLegendOption(data.byId[id].value)}
                                d={REGIONS_TEMPLATE[id].pathDirection}
                            >
                            </path>
                        )
                    })
                }
                {
                    REGIONS_IDS_LIST.map(id => {
                        return (
                            <text 
                                key={id}
                                x={REGIONS_TEMPLATE[id].titleX}
                                y={REGIONS_TEMPLATE[id].titleY}
                                fill="black" 
                                fontSize="10"
                            >
                                {data.byId[id].text}
                            </text>
                        )
                    })
                }
                <Legend chart={chart}  />
            </svg>
        </div>
    )
}