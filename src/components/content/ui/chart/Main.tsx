import { FC } from 'react'
import { REGIONS_IDS_LIST, REGIONS_TEMPLATE } from 'helpers/constants/regions'
import { T_ChartState } from 'store/chart/types'
import { T_RegionOptions, T_RegionsState } from 'store/regions/types'
import { Legend } from '../legend/Main'
import styles from './styles.module.css'

type T_Props = {
  data: T_RegionsState
  chart: T_ChartState
}

export const Chart: FC<T_Props> = ({ data, chart }) => {
  const { legend: legendOptions, styles: customStyles } = chart

  const getColorByLegendOption = (value: T_RegionOptions['value']) => {
    let color = ''
    for (let i = 0; i < legendOptions.allIds.length; i++) {
      const legend = legendOptions.byId[legendOptions.allIds[i]]
      if (value >= legend.rangeStart && value <= legend.rangeEnd) {
        color = legend.color
        break
      }
    }

    return color || customStyles.legend.others.outOfRangeColor
  }

  return (
    <div className={styles.chart} id="chart">
      <canvas id="canvas" width="792.57129" height="802.40002" hidden></canvas>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        id="map"
        width="792.57129"
        height="802.40002"
        viewBox="0 0 792.57129 802.40002"
      >
        {customStyles.chart.shadow.show && (
          <defs>
            <filter id="coloredShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation={customStyles.chart.shadow.blurred} result="blur" />
              <feOffset
                in="blur"
                dx={customStyles.chart.shadow.offset}
                dy={customStyles.chart.shadow.offset}
                result="offsetBlur"
              />
              <feFlood floodColor={customStyles.chart.shadow.color} result="color" />
              <feComposite in="color" in2="offsetBlur" operator="in" result="coloredShadow" />
              <feMerge>
                <feMergeNode in="coloredShadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        )}
        {REGIONS_IDS_LIST.map((id) => {
          return (
            <path
              key={id}
              id={id}
              fill={getColorByLegendOption(data.byId[id]?.value)}
              d={REGIONS_TEMPLATE[id].pathDirection}
              stroke={customStyles.chart.border.color}
              strokeWidth={customStyles.chart.border.width}
              filter="url(#coloredShadow)"
              onClick={() => document.getElementById(id)?.focus()}
            ></path>
          )
        })}
        {customStyles.chart.labels.show &&
          REGIONS_IDS_LIST.map((id) => {
            return (
              <text
                key={id}
                id={id}
                x={data.byId[id]?.label?.xPos - customStyles.chart.labels.fontSize * 1.2 || 0}
                y={data.byId[id]?.label?.yPos + customStyles.chart.labels.fontSize * 0.8 || 0}
                fontSize={customStyles.chart.labels.fontSize}
                fill={customStyles.chart.labels?.color}
              >
                {data.byId[id]?.text}
              </text>
            )
          })}
        <Legend chart={chart} />
      </svg>
    </div>
  )
}
