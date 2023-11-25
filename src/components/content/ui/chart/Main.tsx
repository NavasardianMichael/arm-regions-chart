import { Dispatch, DragEventHandler, FC, MouseEventHandler, useRef } from 'react'
import { T_RegionOptions, T_RegionsState } from 'store/regions/types'
import { T_ChartState } from 'store/chart/types'
import { REGIONS_IDS_LIST, REGIONS_TEMPLATE } from 'helpers/constants/regions'
import styles from './styles.module.css'
import { ErrorBoundary } from 'components/_shared/errorBoundary/Main'
import { setRegionOptions } from 'store/regions/slice'
import { useDispatch } from 'react-redux'
import { Legend } from '../legend/Main'
import { AnyAction } from '@reduxjs/toolkit'

type T_Props = {
    data: T_RegionsState
    chart: T_ChartState
}

export const Chart: FC<T_Props> = ({ data, chart }) => {

    const { legend: legendOptions, styles: customStyles } = chart

    const getColorByLegendOption = (value: T_RegionOptions['value']) => {
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

    return (
        <ErrorBoundary fallback={<h1>an error occured</h1>}>
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
                                    stroke={customStyles.chart.borderColor}
                                >
                                </path>
                            )
                        })
                    }
                    {
                        customStyles.chart.showLabels &&
                        REGIONS_IDS_LIST.map(id => {
                            return (
                                <text 
                                    key={id}
                                    id={id}
                                    x={data.byId[id].label.xPos- customStyles.chart.fontSize * 1.2}
                                    y={data.byId[id].label.yPos + customStyles.chart.fontSize * .8}
                                    fontSize={customStyles.chart.fontSize}
                                    fill={customStyles.chart.color}
                                >
                                    {data.byId[id].text}
                                </text>
                            )
                        })
                    }
                    <Legend chart={chart} />
                </svg>
            </div>
        </ErrorBoundary>
    )
}