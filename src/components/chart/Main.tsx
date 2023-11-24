import { FC, MouseEventHandler, useRef } from 'react'
import { T_RegionOptions, T_RegionsState } from 'store/regions/types'
import { T_ChartState } from 'store/chart/types'
import { REGIONS_IDS_LIST, REGIONS_TEMPLATE } from 'helpers/constants/regions'
import { Legend } from 'components/legend/Main'
import styles from './styles.module.css'
import { ErrorBoundary } from 'components/_shared/errorBoundary/Main'
import { setRegionOptions } from 'store/regions/slice'
import { useDispatch } from 'react-redux'

type T_Props = {
    data: T_RegionsState,
    chart: T_ChartState
}

export const Chart: FC<T_Props> = ({ data, chart }) => {

    const dispatch = useDispatch()
    const { legend: legendOptions, styles: chartStyles } = chart

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

    const isDraggingRef = useRef(false);
    const originalXRef = useRef(0);
    const originalYRef = useRef(0);

    const handleMouseDown: MouseEventHandler<SVGTextElement> = (e) => {
        isDraggingRef.current = true;
        originalXRef.current = e.clientX;
        originalYRef.current = e.clientY;
        // You may want to update the state to indicate which element is being dragged
    };

    const handleMouseMove: MouseEventHandler<SVGTextElement> = (e) => {
        if (!isDraggingRef.current) return;

        const dx = e.clientX - originalXRef.current;
        const dy = e.clientY - originalYRef.current;
        dispatch(setRegionOptions({
            id: e.currentTarget.id as T_RegionOptions['id'],
            label: {
                xPos: dx,
                yPos: dy
            }
        }))
        // Update the position of the text element
        // Calculate the new position based on the delta
        // Update your REGIONS_TEMPLATE or state here with the new position
    };

    const handleMouseUp: MouseEventHandler<SVGTextElement> = (e) => {
        isDraggingRef.current = false;
        // Finalize the position and update the state if necessary
    };

    return (
        <ErrorBoundary fallback={<h1>123321132</h1>}>
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
                        chartStyles.showLabels &&
                        REGIONS_IDS_LIST.map(id => {
                            return (
                                <text 
                                    key={id}
                                    id={id}
                                    x={data.byId[id].label.xPos}
                                    y={data.byId[id].label.yPos}
                                    fontSize={chartStyles.fontSize}
                                    // style={{position: 'absolute'}}
                                    // onDrag={handleLabelDrag}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
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