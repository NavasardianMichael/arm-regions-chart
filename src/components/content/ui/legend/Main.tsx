import { FC, memo } from 'react'
import { T_ChartState } from 'store/chart/types'

type T_Props = {
  chart: T_ChartState
}

export const Legend: FC<T_Props> = memo(({ chart: { legend: legendOptions, styles: chartStyles } }) => {
  return (
    <>
      {chartStyles.legend.labels.show &&
        legendOptions.allIds.map((legendOptionId, index, arr) => {
          const { id, color, name } = legendOptions.byId[legendOptionId]
          const positionY = 802.4 - (arr.length - index) * 35
          return (
            <g key={id}>
              <rect
                width={60}
                height={25}
                rx={2}
                ry={2}
                x={0}
                y={positionY - 16}
                alignmentBaseline="middle"
                fill={color}
                stroke={chartStyles.legend.border.color}
                strokeWidth={chartStyles.legend.border.show ? chartStyles.legend.border.width : 0}
              >
                {name}
              </rect>
              <text
                y={positionY}
                x={80}
                alignmentBaseline="middle"
                fontSize={chartStyles.legend.labels.fontSize}
                fill={chartStyles.legend.labels.color}
              >
                {name}
              </text>
            </g>
          )
        })}
    </>
  )
})
