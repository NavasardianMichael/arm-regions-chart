import { FC } from 'react'

import { REGIONS_IDS } from '../../helpers/constants/regions'
import { T_ChartState } from '../../store/chart/types'
import { T_RegionOptions, T_RegionsState } from '../../store/regions/types'
import styles from './styles.module.css'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { selectChartStyles } from '../../store/chart/selectors'

type T_Props = {
    data: T_RegionsState,
    legendOptions: T_ChartState['legend']
}

export const Chart: FC<T_Props> = ({ data, legendOptions }) => {

    const { showLegend } = useTypedSelector(selectChartStyles);

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
        <div
            className={styles.chart}
            id="chart"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="map"
                width="792.57129"
                height="802.40002"
                viewBox="0 0 792.57129 802.40002"
            >
                <path 
                    d="m 184.5425,178.23394 3.08,-1.26 3.54,0.39 4.13,2.32 7.08,8.54 10.33,0 1.47,-7.37 5.02,-0.78 4.43,0 11.5,6.98 2.36,-2.32 2.66,0 3.84,2.71 2.36,3.88 0.29,7.76 -0.55,3.61 0,0 -0.33,2.2 6.49,8.14 2.06,5.42 8.85,10.46 7.38,2.32 14.16,2.32 -0.59,6.2 -2.06,7.73 -3.84,6.96 -4.13,5.42 -3.54,0 0.88,11.21 -4.71,10.04 0,11.58 -1.48,5.02 -7.97,-0.38 -2.36,6.17 -14.16,15.81 -3.84,2.7 -0.88,2.7 1.47,2.7 3.25,0 3.54,-1.93 3.54,0 1.77,3.08 0.59,3.86 -2.65,7.7 -1.66,2.47 0,0 -5.13,8.7 0,4.71 0,0 -4.16,-0.65 -4.47,-2.78 -19.84,-7.51 -5.75,-7.24 -1.5,-0.84 -1.49,0.56 -7.25,8.63 -3.2,1.67 -2.98,0 -3.84,-1.67 -1.92,-3.9 -2.13,-1.39 -2.35,0.83 1.28,20.04 -2.99,2.22 -22.39,-0.55 -7.46,-2.23 -15.78,-2.78 -10.45,-3.34 -9.81,-0.83 -10.88,-8.91 -3.199995,-0.83 -0.64,-4.73 -2.77,-0.84 -6.61,0 -4.69,-0.83 -7.68,-3.62 -14.29,1.11 -5.54,3.34 -1.4,1.69 0,0 -8.02,-3.59 -0.33,-5.11 -1.65,-5.47 -10.58,-10.81 -0.95,-1.86 0.83,-3.42 7.97,-13.31 -0.54,-6.12 -1.54,-3.52 -1.03,-1.65 -2.89,-2.11 0,0 4.68,-0.51 9.86,-2.58 8.22,-6.89 2.31,-4.31 6.25,-4.3 9.53,-0.87 3.29,-0.86 3.29,-2.15 2.63,-0.43 3.62,2.58 5.59,1.73 5.589995,-0.44 2.3,-1.72 2.96,0 4.28,1.72 3.94,3.02 6.91,0 7.56,-4.31 4.28,0 4.6,1.29 5.92,6.04 4.6,0.43 2.63,-1.73 2.96,-0.86 5.27,0 3.61,1.29 4.61,0 10.19,-3.87 3.62,-3.45 2.96,0 1.32,-3.45 0,-3.44 -5.6,-6.47 -0.32,-3.88 0,-5.61 2.96,-7.76 -11.84,-1.72 0,-6.91 -0.99,-3.02 -7.56,-11.66 -0.33,-4.75 0.98,-4.75 3.29,-3.89 4.94,-3.89 5.26,-1.3 7.56,-0.43 z"     
                    id="aragatsotn" fill={getColorByLegendOption(data.byId[REGIONS_IDS.aragatsotn].value)}>
                        <title>aragatsotn</title>
                    </path>
                <path
                    d="m 233.3325,425.38394 -1.43,-2.65 -2.73,-2.78 -6.58,-1.84 -3.04,-1.96 0,0 1.99,-15.36 -0.21,-3.33 -5.97,-7.78 -0.64,-3.61 0.85,-3.33 2.34,-1.39 5.76,-0.56 10.88,0.28 5.54,0.83 2.14,1.95 2.13,0.55 0.39,-0.81 0,0 6.6,6.55 3.84,1.54 5.01,0.38 3.84,1.92 4.72,4.99 1.77,0.77 1.48,-0.77 5.01,-5.76 5.02,-0.38 2.65,-1.15 4.72,-4.62 5.91,-3.84 5.16,-8.27 0,0 -0.59,13.84 3.24,5 6.5,1.92 5.01,-0.38 2.07,-0.77 0,-3.85 1.47,-1.53 3.54,0 2.66,-3.08 2.65,-0.77 3.54,0.39 1.19,-3.85 2.06,-3.07 17.56,-0.96 4.13,-9.23 4.42,-1.93 4.72,0.39 5.32,-2.31 23.89,0.77 1.14,-0.89 0,0 1.37,0.7 0,1.92 -3.54,19.23 0,9.99 20.95,31.86 -0.29,14.96 1.47,4.22 0,6.89 -1.47,12.65 1.98,3.54 0,0 0.38,0.67 -7.97,5.36 -3.25,5.35 -1.47,4.6 -0.79,7.14 0,0 -1.91,0 -6.17,4.31 -2.85,3.69 -2.17,5.84 -5.67,3.53 -5.72,2.31 -3.77,0.9 -14.59,0.26 -14.91,1.63 -8.52,1.16 -7.06,2.23 -2.46,-0.34 -1.26,-1.33 0.42,-4.97 -2.37,-1.38 -3.44,0.15 -1.31,-5.07 -3.3,-4.51 -1.42,-0.9 -2.8,0.94 0.16,-2.6 1.55,-4 -2.32,-1.81 -1.7,0.05 -1.95,1.59 -2.08,0.24 -13.39,-8.94 1.32,-2.37 -0.34,-1.8 -4.38,1.52 -1.59,-0.61 -0.75,-1.08 -0.41,-7 -1.68,-2.99 -4.12,-2.91 -2.36,-2.81 -1.66,-8.55 -4.24,-4.85 -4.37,-2.48 -8.56,-12.52 -5.76,-1.67 -2.58,-2.89 -8.99,-6.77 -5.47,0 z"
                    id="ararat" fill={getColorByLegendOption(data.byId[REGIONS_IDS.ararat].value)}>
                        <title>ararat</title>
                    </path>
                
                <path
                    d="m 54.552505,340.62394 1.4,-1.69 5.54,-3.34 14.29,-1.11 7.68,3.62 4.69,0.83 6.61,0 2.77,0.84 0.64,4.73 3.199995,0.83 10.88,8.91 9.81,0.83 10.45,3.34 15.78,2.78 7.46,2.23 22.39,0.55 2.99,-2.22 -1.28,-20.04 2.35,-0.83 2.13,1.39 1.92,3.9 3.84,1.67 2.98,0 3.2,-1.67 7.25,-8.63 1.49,-0.56 1.5,0.84 5.75,7.24 19.84,7.51 4.47,2.78 4.16,0.65 0,0 1.18,0.19 1.49,5.28 2.13,3.06 -1.71,11.67 1.82,1.26 -0.22,4.72 -0.67,1.41 0,0 -0.39,0.81 -2.13,-0.55 -2.14,-1.95 -5.54,-0.83 -10.88,-0.28 -5.76,0.56 -2.34,1.39 -0.85,3.33 0.64,3.61 5.97,7.78 0.21,3.33 -1.99,15.36 0,0 -3.57,-1.95 -2.37,0.1 -1.87,1.01 -1.24,-1.65 -2.21,-0.63 -1.53,-1.81 -4.88,-0.52 -5.21,1.1 -1.06,1.54 -1.93,-0.33 -1.73,2.05 -5.26,-0.3 -1.69,0.65 -1.02,2.53 -4.75,0.46 -4.65,-1.37 -6.25,0.79 -2.51,-1.82 -11.87,2.71 -13.77,0.77 -3.08,-0.15 -2.5,-1.08 -5.89,2.58 -4.74,-0.58 -11.2,0.68 -6.71,-2.89 -4.18,-3.39 -8.119995,-3.5 -2.42,-2.18 -3.47,-1.08 -8.91,-6.77 -8.09,1.03 -4.67,-1.08 -5.73,-5.03 -8.28,-3.42 -3.52,-4.49 -0.49,-3.34 0.93,-3.93 3.31,-4.58 12.51,-3.37 0.09,-2.01 -1.69,-2.32 -9.41,-7.6 -4.86,-5.58 -0.24,-1.7 0.95,-0.93 7.26,-0.53 -0.06,-9.3 z"
                    id="armavir" fill={getColorByLegendOption(data.byId[REGIONS_IDS.armavir].value)}>
                        <title>armavir</title>
                    </path>
                
                <path
                    d="m 240.7325,356.00394 0,-4.71 5.13,-8.7 0,0 3.72,4.08 11.51,-0.39 12.98,-4.62 4.43,0 2.36,1.16 2.06,6.54 4.13,2.31 12.69,10.78 2.95,5 -0.88,5.77 -1.33,1.73 0,0 -5.16,8.27 -5.91,3.84 -4.72,4.62 -2.65,1.15 -5.02,0.38 -5.01,5.76 -1.48,0.77 -1.77,-0.77 -4.72,-4.99 -3.84,-1.92 -5.01,-0.38 -3.84,-1.54 -6.6,-6.55 0,0 0.67,-1.41 0.22,-4.72 -1.82,-1.26 1.71,-11.67 -2.13,-3.06 -1.49,-5.28 z"
                    id="yerevan" fill={getColorByLegendOption(data.byId[REGIONS_IDS.yerevan].value)}>
                        <title>yerevan</title>
                    </path>
                <path
                    d="m 509.2825,232.81394 -2.02,0.47 -1.54,-1.4 -3.92,-14.8 2.37,-5.3 4.04,-4.52 8.78,1.09 4.87,5.45 -1.07,8.1 -1.54,2.02 -1.9,1.09 -3.32,0.62 -2.25,5.92 -2.5,1.26 z m -169.71,-18.23 3.06,0.81 8.04,-0.62 2.84,-3.42 5.45,-3.86 3.12,-4.12 2.02,-1.4 5.27,2.23 9.1,6.5 6.05,0.94 3.93,-1.53 7.95,-0.77 15.63,-16.57 9.14,-4.37 3.52,0.05 6.43,-1.97 7.1,-0.93 7.81,1.24 7.1,2.18 7.81,3.73 15.05,14.14 0,0 -1.26,2.25 -0.41,3.72 0.55,1.74 4.53,2.83 1.19,1.71 -0.93,7.69 2.22,1.29 1.92,2.55 7.12,0.31 3.56,2.49 2.37,3.89 -0.59,1.87 -2.61,1.56 -0.71,2.18 1.31,3.89 -2.02,1.87 -0.59,2.33 0.95,5.29 3.82,5.6 10.14,7.86 1.98,0.37 1.03,1.2 -0.36,3.89 2.85,1.71 2.26,3.89 9.38,5.59 3.84,0.27 2.81,-0.73 3.68,2.33 4.51,5.75 3.92,2.17 0.83,4.19 1.9,3.57 1.9,1.55 10.8,0.16 5.48,4.19 3.56,1.09 2.9,-0.23 4.91,1.62 3.44,2.79 1.99,3.76 20.46,5.86 1.9,1.09 3.19,4.48 11.52,-0.3 6.77,4.96 0.03,5.79 -2.67,1.84 -1.96,-0.56 -0.14,2.31 5.68,6.13 4.11,5.59 0.46,1.73 -2.92,4.51 -0.81,3.84 -1.76,13.5 0.11,5.01 -0.95,1.7 -1.54,0.77 -2.89,0.03 -7.18,3.81 -0.13,2.97 1.31,2.47 -0.24,4.48 -1.9,7.57 -3.63,5.48 -0.52,3.14 -0.85,1.08 -1.44,0.84 -3.1,-0.48 -4.39,2.49 -1.5,5.36 -1.66,0.62 -1.7,-0.2 -4.24,-5.82 -3.44,-3.55 -2.14,-1.23 -3.8,1.54 -2.07,-1.03 -17.96,0.15 -3.68,-1.85 -1.42,0.15 -2.14,1.7 -3.09,1.08 -8.19,0.15 -2.24,2.14 -1.43,6.66 -5.87,0.08 0,0 -1.18,-1.66 -3.84,-1.92 -7.97,-0.38 -1.77,5.76 -5.9,4.6 -12.39,3.07 -28.62,1.54 -23.6,8.43 -12.98,9.97 -10.33,11.49 -4.43,2.68 -1.55,0.1 0,0 -1.99,-3.55 1.48,-12.64 0,-6.9 -1.48,-4.22 0.3,-14.96 -20.95,-31.86 0,-9.99 3.54,-19.23 0,-1.92 -1.37,-0.7 0,0 -1.14,-2.57 -5.02,-3.08 -3.83,0.39 -3.54,-1.92 -4.42,-6.16 -1.77,-11.94 -3.8,-6.44 -10.24,-47.71 2.82,-4.27 5.24,-4.86 -0.22,-1.13 -7.97,-1.54 -2.36,-1.16 -5.82,-5.29 -2.82,-8.36 -1.63,-8.17 -1.78,-3.11 -1.19,-1.67 -7.12,-2.41 -0.19,-28.99 0,0 1.29,0.29 z"
                    id="gegharquniq" fill={getColorByLegendOption(data.byId[REGIONS_IDS.gegharquniq].value)}>
                        <title>gegharquniq</title>
                    </path>
                <path 
                    d="m 338.2025,214.24394 0.19,28.99 7.13,2.41 1.18,1.66 1.78,3.11 1.63,8.17 2.82,8.36 5.82,5.29 2.36,1.15 7.97,1.55 0.22,1.13 -5.24,4.86 -2.82,4.28 10.24,47.71 3.8,6.44 1.77,11.94 4.42,6.16 3.54,1.92 3.84,-0.38 5.01,3.08 1.14,2.57 0,0 -1.14,0.89 -23.89,-0.77 -5.32,2.31 -4.72,-0.39 -4.42,1.93 -4.13,9.23 -17.56,0.96 -2.06,3.07 -1.19,3.85 -3.54,-0.39 -2.65,0.77 -2.66,3.08 -3.54,0 -1.47,1.53 0,3.85 -2.07,0.77 -5.01,0.38 -6.5,-1.92 -3.24,-5 0.59,-13.84 0,0 1.33,-1.73 0.88,-5.77 -2.95,-5 -12.69,-10.78 -4.13,-2.31 -2.06,-6.54 -2.36,-1.16 -4.43,0 -12.98,4.62 -11.51,0.39 -3.72,-4.08 0,0 1.66,-2.47 2.65,-7.7 -0.59,-3.86 -1.77,-3.08 -3.54,0 -3.54,1.93 -3.25,0 -1.47,-2.7 0.88,-2.7 3.84,-2.7 14.16,-15.81 2.36,-6.17 7.97,0.38 1.48,-5.02 0,-11.58 4.71,-10.04 -0.88,-11.21 3.54,0 4.13,-5.42 3.84,-6.96 2.06,-7.73 0.59,-6.2 -14.16,-2.32 -7.38,-2.32 -8.85,-10.46 -2.06,-5.42 -6.49,-8.14 0.33,-2.2 0,0 7.63,-6.33 4.72,-2.71 18.89,-1.16 1.77,1.55 2.95,0.77 4.72,0 2.95,-1.94 4.43,0 8.85,2.72 10.32,5.42 6.99,2.37 2.06,2.9 7.57,1.99 2.58,1.64 0,0 0.26,2.34 1.43,1.52 0.67,-0.35 0,0 z"     
                    id="kotayk"  fill={getColorByLegendOption(data.byId[REGIONS_IDS.kotayk].value)}>
                        <title>kotayk</title>
                    </path>
                <path  
                    d="m 356.2425,13.38394 0.47,3.4 2.13,2.51 4.02,1.57 2.6,1.88 1.89,3.13 -0.7,3.13 -5.92,6.58 -4.73,2.19 -2.6,0.32 -5.21,5.01 4.86,5.68 5.7,3.07 3.38,3.53 3.03,0.47 3.21,2.45 3.73,3.41 0.72,2.24 -1.52,6.12 -1.15,2.35 -2.32,2.35 -9.34,5.06 -4.37,0.71 -4.36,1.88 -5.34,0.35 -4.18,1.76 -3.3,3.88 -1.33,4.82 -0.09,3.76 1.42,6.11 5.7,3.76 14.51,3.25 2.58,1.17 2.94,4.58 0,3.29 -1.34,3.05 -4.89,3.17 -4.54,12.55 -1.34,9.15 -2.31,2.93 -4.1,2.34 -2.22,2.34 -11.75,6.52 -4.1,7.03 -0.71,5.97 1.16,1.41 5.96,2.34 0.54,1.4 -4.63,4.8 0.44,2.81 3.15,5.74 4.34,4.41 -1.06,2.58 0.58,1.98 -2.1,6.83 -1.24,1.41 0,0 -2.58,-1.64 -7.57,-1.99 -2.06,-2.9 -6.99,-2.37 -10.32,-5.42 -8.85,-2.72 -4.43,0 -2.95,1.94 -4.72,0 -2.95,-0.77 -1.77,-1.55 -18.89,1.16 -4.72,2.71 -7.63,6.33 0,0 0.55,-3.61 -0.29,-7.76 -2.36,-3.88 -3.84,-2.71 -2.66,0 -2.36,2.32 -11.5,-6.98 -4.43,0 -5.02,0.78 -1.47,7.37 -10.33,0 -7.08,-8.54 -4.13,-2.32 -3.54,-0.39 -3.08,1.26 0,0 0,-2.1 -3.62,0 -6.58,1.3 -4.93,-0.43 -0.33,-2.16 0.66,-1.73 -0.66,-2.17 -7.56,-3.46 -8.22,1.3 -3.29,-4.33 -1.98,-5.19 -0.98,-15.59 2.3,-4.77 4.93,-4.33 3.29,-1.73 3.95,-1.3 4.93,0 3.62,-2.61 2.3,-3.03 0,-5.2 -1.32,-2.61 4.61,0 3.29,-3.47 3.94,-7.37 0.33,-3.04 -1.31,-1.74 -2.63,-0.43 -9.21,1.3 -4.28,-0.87 -0.98,-2.17 0.65,-12.15 -2.63,-3.91 -3.61,-1.31 -0.99,-5.64 -1.97,-3.05 -1.65,-0.87 -3.29,0 -3.94,-1.73 -2.63,-1.74 -2.96,-3.48 -0.33,-18.7 2.54,-7.18 0,0 8.85,-3.39 17.26,0.72 4.76,-0.86 2.74,-7.55 1.69,-8.49 1.3,-1.31 1.43,-0.05 3.06,2.76 1.73,0.48 5.42,-0.63 3.41,2.75 1.49,3.15 2.81,1.57 4.01,1.18 2.82,-0.2 2.06,-1.65 2.05,0.27 2.39,1.04 3.74,3.68 2.81,-0.19 1.04,-2.17 0.89,-6.87 1.49,-1.48 6.02,3.43 6.24,7.09 5.29,1.61 6.19,3.65 1.42,1.81 4.1,-0.47 7.81,-4.45 4.96,-9.34 1.69,-0.35 1.16,0.7 -1.6,8.96 1.96,0.24 3.73,-3.19 5.35,-1.06 1.69,1.65 0.44,1.77 1.34,0.83 1.33,-0.95 2.94,-14.03 1.07,-0.82 1.6,0 2.76,1.77 3.83,0.23 5.34,-0.23 1.78,-1.18 1.6,0 1.69,5.19 1.16,1.18 6.71,0.65 0.74,0.77 0.24,2.8 1.28,0.68 4.89,-4.34 10.49,-0.38 2.08,0.83 3.73,-1.2 8.38,3.52 5.66,1 3.42,-0.19 4.08,-1.57 -1.23,-3.08 -2.09,-0.76 -3.23,1.32 -5.18,-2.59 -5.88,-0.87 -5.56,-6.29 -0.57,-8.68 0.48,-3.28 1.76,-4.15 1.61,-1.26 3.04,0.82 5.13,6.36 6.12,1.19 3.85,2.14 z"    
                    id="lori" fill={getColorByLegendOption(data.byId[REGIONS_IDS.lori].value)}>
                        <title>lori</title>
                    </path>
                <path   
                    d="m 64.992505,162.72394 -0.99,-4.31 -5.82,-8.12 -1.3,-7.51 0.12,-4.85 1.3,-6.72 -1.66,-2.97 -0.47,-7.51 -5.7,-4.39 -7.48,-7.36 -9.99,-6.03 -5.4,-0.74 -4.23,-4.45 -3.42,-2.36 -3.41,-1.17 -7.7100001,-0.34 -0.99,-2.7 -1.63,-1.56 0.3,-11.37 -0.74,-2.94 -2.23,-3.53 -2.37,-1.47 -0.91,-4.28 4.17,-8.5 4.81,0.01 3.5800001,-1.94 8.17,-1.96 5.34,-2.36 5.26,0.39 8.57,5.5 3.86,-1.57 11.41,-0.93 3.72,0.53 17.18,8.64 8.26,-10.62 7.58,-5.2 4.81,-2.24 11.869995,-1.17 3.71,-1.38 6.97,-0.59 4.15,0.98 1.79,1.57 2.22,0.2 8.01,-5.89 2.82,0.39 4.15,-0.59 1.33,1.23 0,0 -2.54,7.18 0.33,18.7 2.96,3.48 2.63,1.74 3.94,1.73 3.29,0 1.65,0.87 1.97,3.05 0.99,5.64 3.61,1.31 2.63,3.91 -0.65,12.15 0.98,2.17 4.28,0.87 9.21,-1.3 2.63,0.43 1.31,1.74 -0.33,3.04 -3.94,7.37 -3.29,3.47 -4.61,0 1.32,2.61 0,5.2 -2.3,3.03 -3.62,2.61 -4.93,0 -3.95,1.3 -3.29,1.73 -4.93,4.33 -2.3,4.77 0.98,15.59 1.98,5.19 3.29,4.33 8.22,-1.3 7.56,3.46 0.66,2.17 -0.66,1.73 0.33,2.16 4.93,0.43 6.58,-1.3 3.62,0 0,2.1 0,0 -0.99,11.31 -7.56,0.43 -5.26,1.3 -4.94,3.89 -3.29,3.89 -0.98,4.75 0.33,4.75 7.56,11.66 0.99,3.02 0,6.91 11.84,1.72 -2.96,7.76 0,5.61 0.32,3.88 5.6,6.47 0,3.44 -1.32,3.45 -2.96,0 -3.62,3.45 -10.19,3.87 -4.61,0 -3.61,-1.29 -5.27,0 -2.96,0.86 -2.63,1.73 -4.6,-0.43 -5.92,-6.04 -4.6,-1.29 -4.28,0 -7.56,4.31 -6.91,0 -3.94,-3.02 -4.28,-1.72 -2.96,0 -2.3,1.72 -5.589995,0.44 -5.59,-1.73 -3.62,-2.58 -2.63,0.43 -3.29,2.15 -3.29,0.86 -9.53,0.87 -6.25,4.3 -2.31,4.31 -8.22,6.89 -9.86,2.58 -4.68,0.51 0,0 -5.33,-5.27 -4.62,-1.08 -2.59,-2.71 -0.27,-2.91 2.32,-0.81 0.33,-3.66 4.87,-2.42 9.85,-8.37 1.05,-0.44 0.59,1.21 1.27,0.6 1.24,-5.82 2.08,1.82 1.94,0.09 -1.49,-8.99 6.97,-2.1 4.63,-5.45 3.2,-7.47 1.43,-1.09 1.9,-6.23 1.89,-2.03 1.43,-3.89 0.47,-4.68 2.5,-1.71 2.53,-5.14 -1.53,-3.16 0.89,-0.51 0.24,-4.84 -1.66,-3.5 1.72,-6.13 -1.51,-5.57 z"  
                    id="shirak" fill={getColorByLegendOption(data.byId[REGIONS_IDS.shirak].value)}>
                        <title>shirak</title>
                    </path>
                <path
                    d="m 589.9025,574.01394 -2.26,-8.95 -5.35,-5.07 -7.24,-2.45 -8.63,-1.3 0,0 -1.13,-12.04 -0.19,-14.96 3.98,-10.3 -0.95,-6.63 -1.89,-4.66 0.76,-9.58 4.92,-8.85 10.24,-13.27 7.16,-4.38 0,0 3.57,9.9 5.94,0.62 6.76,2.77 9.03,6.14 7.59,1.24 4.86,0 2.73,1.7 5.33,6 0.75,4.17 1.46,2.78 5.96,5.57 1.93,5.04 6.31,3.93 -1.3,2.9 0.95,3.53 1.54,1.39 4.51,-3.23 2.5,0.46 8.78,9.53 3.2,1.53 4.16,3.53 1.69,3.45 -0.86,3 1.49,3.9 0.29,7.19 2.49,-0.81 2.38,-3.53 6.76,-0.61 8.9,1.07 5.82,-4.91 9.25,-5.06 12.44,-0.94 1.15,5.59 1.43,1.84 4,-0.45 5.37,-5.69 1.43,0.61 -0.63,2.99 0.98,3.31 0,4.45 -1.42,4.44 1.42,2.61 5.54,1.59 2.16,-1.92 3.63,1.23 2.94,-2.48 12.6,-1.59 8.74,4.71 2.61,1.99 1.54,3.07 1.07,4.59 -0.59,1.54 -3.56,0 -1.83,-2.28 -2.55,0.05 -1.58,0.77 -2.62,3.86 -6.95,4.16 -0.23,2.08 1.18,3.39 7.98,7.72 1.77,3.21 -2.27,0.29 -2,-1.19 -4.5,-1.1 -1.58,-2.55 -2.28,-0.95 -3.37,2.44 -4.49,7.82 -1.49,0.91 -8.55,-2.07 -4.64,0.17 -1.75,2.48 -0.77,3.88 -2.87,3.22 0.52,9.26 3.68,5.81 1.67,4.43 2.13,1.38 1.3,-0.03 10.77,8.65 2.6,1.3 2.7,-1.43 3.38,-3.4 0.96,0.08 7.14,9.41 0.11,2.84 -2.85,2.45 -0.35,2.13 7.14,11.49 6.93,2.41 1.55,4.52 1.92,2.23 7.69,0.67 1.13,0.29 0.59,1.21 -1.22,1.06 -7.81,-0.15 -4.75,1.67 0.48,2.29 -0.65,2.15 -3.45,5.6 -2.65,2.16 -2.27,3.51 -2.14,-1.52 -2.14,-10.52 -2.85,-1.03 -2.01,2.47 0.95,4.81 -0.6,1.07 -1.9,-0.31 -2.72,-3.11 -4.78,-2.23 -5.16,-0.16 -1.84,2.1 -0.03,6.03 2.19,6.24 3.35,0.66 3.38,2.12 3.86,-1.65 2.14,1.32 -1.96,3.51 0.09,2.42 4.08,2.8 0.02,3.53 1.03,2.2 3.97,2.23 2.29,3.44 -0.3,2.22 -2.31,1.55 -0.84,2.85 1.6,1.94 4.57,0.87 -3.13,4.3 -0.24,1.83 2.61,11.72 -6.05,2.12 -0.36,3.2 1.19,4.25 -1.8,2.23 -3.42,1.88 -0.12,2.28 0.36,3.34 3.32,4.41 4.51,8.2 1.98,7.98 -2.49,1.85 -2.35,-0.72 -0.62,-4.28 -1.01,-0.96 -8.55,1.38 -3.28,-1.04 -2.92,-2.46 -1.18,-0.15 -2.95,0.76 -4.17,-0.35 -1.54,1.97 -1.6,0.16 -11.93,-8.82 -2.61,-1.06 -3.44,0 -2.49,0.91 -5.11,4.71 -2.02,-0.76 -5.46,0.15 -0.8,3.25 0.69,3.43 -1.78,2.43 -2.14,-0.15 0.47,-5.77 -1.42,-2.12 -1.07,0 -1.66,1.36 -1.31,3.8 0,3.03 -1.18,0.61 -2.97,-0.61 -0.95,2.28 2.32,3.98 0,2.12 -1.19,1.22 -2.02,-1.22 -0.73,-1.86 0,0 -0.2,-0.53 0,0 -2.39,-1.4 -2.26,0 -2.96,1.82 -2.14,4.25 -2.37,-1.21 0.11,-3.8 -1.66,-1.21 -2.39,7 -3.66,-0.32 1.19,-15.64 -1.31,-5.01 -3.32,-4.86 -2.02,-6.53 -2.49,-11.71 -0.81,-7.79 0.24,-5.18 -6.08,-5.05 -0.83,-2.59 0.24,-12.02 -1.54,-2.74 -6.3,-2.9 -4.24,-3.44 -0.53,-3.01 0.68,-6.88 -4.81,-6.48 1.18,-7.14 -3.47,-3.52 0,-5.62 -0.83,-3.58 -0.26,-10.9 1.09,-2.95 1.82,-0.7 0.47,-4.89 -0.35,-4.12 -1.63,-2.65 -8.28,-1.99 -5.7,-4.13 -2.49,-2.9 -4.16,-1.07 -7.24,-5.81 -4.39,-2.44 -1.57,-2.04 -11.7,-1.48 -1.58,-0.55 -3.51,-3.77 -0.93,-2.5 0.32,-4.69 3.15,-6.2 8.35,-11.67 0,-3.52 -1.35,-4.32 -2.61,-2.76 -0.8,-2.41 0.78,-10.36 z"
                    id="syunik" fill={getColorByLegendOption(data.byId[REGIONS_IDS.syunik].value)}>
                        <title>syunik</title>
                    </path>
                <path
                    d="m 475.9625,206.84394 -15.04,-14.14 -7.81,-3.73 -7.1,-2.18 -7.8,-1.24 -7.1,0.93 -6.43,1.97 -3.52,-0.05 -9.14,4.37 -15.63,16.56 -7.95,0.77 -3.93,1.53 -6.05,-0.93 -9.1,-6.5 -5.26,-2.23 -2.02,1.4 -3.11,4.12 -5.46,3.86 -2.83,3.41 -8.05,0.63 -3.06,-0.81 0,0 -4.7,-1.16 0,0 -0.67,0.35 -1.43,-1.52 -0.26,-2.34 0,0 1.24,-1.41 2.1,-6.83 -0.58,-1.98 1.06,-2.58 -4.34,-4.41 -3.15,-5.74 -0.44,-2.81 4.63,-4.8 -0.54,-1.4 -5.96,-2.34 -1.16,-1.41 0.71,-5.97 4.1,-7.03 11.75,-6.52 2.22,-2.34 4.1,-2.34 2.31,-2.93 1.34,-9.15 4.54,-12.55 4.89,-3.17 1.34,-3.05 0,-3.29 -2.94,-4.58 -2.58,-1.17 -14.51,-3.25 -5.7,-3.76 -1.42,-6.11 0.09,-3.76 1.33,-4.82 3.3,-3.88 4.18,-1.76 5.34,-0.35 4.36,-1.88 4.37,-0.71 9.34,-5.06 2.32,-2.35 1.15,-2.35 1.52,-6.12 -0.72,-2.24 -3.73,-3.41 -3.21,-2.45 -3.03,-0.47 -3.38,-3.53 -5.7,-3.07 -4.86,-5.68 5.21,-5.01 2.6,-0.32 4.73,-2.19 5.92,-6.58 0.7,-3.13 -1.89,-3.13 -2.6,-1.88 -4.02,-1.57 -2.13,-2.51 -0.47,-3.4 0,0 -0.15,-2.6 1.61,-1.82 2.38,1.44 1.98,3.23 5.23,1.39 5.05,0.04 1.42,-1.01 2.99,-5.09 10.37,-7.95 1.94,1.32 2.01,7.16 5.58,7.52 0.22,2.42 -2.02,7.21 -4.64,3.47 0.31,2.37 1.84,0.78 3.09,-0.78 2.79,3.14 2.61,1.42 2.02,2.98 2.79,-0.08 1.66,-1.49 1.2,-3.19 3.43,-0.82 1.84,-2.04 1.24,-0.24 3.62,2.68 6.31,8.5 7.19,1.18 2.01,2.12 0.6,4.79 -1.48,1.06 -3.06,4.37 -11.06,4.08 -12.26,1.48 -3,2.19 -2.31,3.79 -2.1,7.15 -2.45,3.59 1.1,3.87 2.22,1.64 3.17,-0.22 4.76,-3.42 2.42,-0.08 2.16,0.96 1.79,-0.69 0.87,-6.68 -1.08,-3.67 1.48,-1.85 1.89,-0.2 5.42,2.98 1.01,1.72 0.18,1.89 -1.36,4.31 0.65,2.35 4.46,-0.53 7.18,2.67 3.2,5.8 4.36,4.72 4.36,-1.51 3.09,-5.33 3.76,-0.84 1.61,1.31 1.72,5.8 3.02,3.91 7.49,-0.46 4.92,1.8 1.43,-0.55 1.74,-2.7 10.02,-5.24 5.9,-0.73 1.19,0.49 1.2,2.02 -1.12,2.35 -2.2,2.82 -5.93,4.46 0.17,1.96 2.67,5.33 3.53,1.2 4.72,-2.16 1.5,0.13 3.86,3.68 2.78,4.3 -0.29,1.88 -1.13,1.49 0.83,2.11 5.88,0.78 1.78,1.17 3.26,4.31 4.33,2.27 2.79,0.07 1.48,0.94 0.48,3.13 1.42,1.57 3.5,-2.59 1.84,0 1.9,1.02 1.29,1.77 2.63,7.89 0.18,4.23 -1.6,2.5 -1.43,4.45 -6.41,5.86 -4.63,6.32 -0.77,2.89 -2.07,2.19 -9.38,1.01 -6.53,5.94 -7.24,0.73 -5.1,1.72 -7.83,4.83 -2.02,2.81 -0.12,2.5 1.07,3.74 -1.66,1.72 -1.19,-0.47 -0.83,-1.87 -2.73,0.31 z"
                    id="tavush" fill={getColorByLegendOption(data.byId[REGIONS_IDS.tavush].value)}>
                        <title>tavush</title>
                    </path>
                <path          
                    d="m 408.5725,495.17394 -1.7,-1.14 -4.5,-0.31 0,0 0.79,-7.14 1.47,-4.6 3.25,-5.35 7.97,-5.36 -0.38,-0.67 0,0 1.56,-0.1 4.42,-2.68 10.33,-11.49 12.98,-9.97 23.61,-8.43 28.62,-1.53 12.39,-3.07 5.9,-4.6 1.77,-5.76 7.97,0.38 3.83,1.92 1.19,1.66 0,0 5.99,-0.01 1.54,6.25 1.67,0.93 11.03,-0.46 2.73,1.23 8.19,0.93 5.58,4.01 1.54,2 9.26,0.62 2.73,0.46 1.54,1.08 2.02,2.16 1.44,4.22 0,1.24 -2.38,2.15 -0.59,1.7 0.95,2.62 4.51,7.09 1.53,6.42 0,0 -7.16,4.38 -10.24,13.27 -4.92,8.85 -0.76,9.58 1.89,4.66 0.95,6.63 -3.98,10.3 0.19,14.96 1.13,12.04 0,0 -3.88,-2.08 -2.2,-0.22 -3.36,2.73 -2.01,2.69 -6.28,1.4 -6.05,4.76 -9.26,-1.38 -2.01,1.38 -3.21,5.82 -3.32,1.84 -2.85,-0.15 -2.14,1.84 -0.74,2.8 -8.39,5.78 -2.97,2.61 -0.51,1.58 -7.57,-0.58 -3.66,-7.39 -2.23,-2.13 -5.47,0.17 -3.73,-2.84 -8.9,0.3 -2.37,-1.37 -7.01,-6.44 -4.83,-11.42 -4.38,-3.23 -7.04,-0.95 -2.21,1.2 -3.52,4.29 -2.18,4.22 -2.98,0.33 -7.27,-3.34 0.09,-14.38 1.8,-3.88 -2.37,-2.15 -0.12,-3.99 2.52,-2.95 -1.68,-5.21 -3.69,-2.66 -3.52,-5.17 -2.47,-6.81 -4.79,-7.61 -6.86,-5.37 z"     
                    id="vayotsDzor" fill={getColorByLegendOption(data.byId[REGIONS_IDS.vayotsDzor].value)}>
                        <title>vayotsDzor</title>
                </path>
                {
                    showLegend &&
                    legendOptions.allIds.map((legendOptionId, index, arr) => {
                        const { id, color, name } = legendOptions.byId[legendOptionId];
                        const positionY = 802.4 - (arr.length - index) * 35
                        return (
                            <g key={id} className={styles.legendOption}>
                                <rect 
                                    width={60}
                                    height={25}
                                    rx={2}
                                    ry={2}
                                    x={0}
                                    y={positionY - 16}
                                    alignmentBaseline="middle" 
                                    fill={color}
                                >
                                    {name}
                                </rect>
                                <text 
                                    y={positionY}
                                    x={80} 
                                    alignmentBaseline="middle"
                                    fontSize={20}
                                >
                                    {name}
                                </text>
                            </g>
                        )
                    })
                }
            </svg>
        </div>
    )
}