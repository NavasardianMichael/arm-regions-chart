import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC, useCallback, useState } from 'react';

import styles from './styles.module.css';
import { useTypedDispatch } from 'hooks/useTypedDispatch';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { selectRegionsData } from 'store/regions/selectors';
import { T_RegionOptions, T_RegionsState } from 'store/regions/types';
import { setRegionOptions, setRegionsData } from 'store/regions/slice';
import { isOdd } from 'helpers/functions/commons';
import { REGIONS_LOCALIZE_OPTIONS } from 'helpers/constants/regions';
import { TextFormat } from './TextFormat';
import { setChartLegends } from 'store/chart/slice';
import { T_ChartState } from 'store/chart/types';
import { LEGEND_INITIAL_ROWS, LEGEND_INITIAL_ROW_IDS } from 'helpers/constants/chart';
import { Button } from 'components/_shared/button/Main';

export const DataTable: FC = () => {

    const dispatch = useTypedDispatch()
    const data = useTypedSelector(selectRegionsData)
    const [ isProcessedTable, setIsProcessedTable ] = useState(false)
    const [ unProcessedText, setUnprocessedText ] = useState('');

    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const { name, value } = e.target
        const attrName = e.currentTarget.getAttribute('data-region-option-name') as keyof T_RegionOptions
        dispatch(setRegionOptions({
            id: name as T_RegionOptions['id'],
            [attrName]: value,
        }))
    }, [])

    const handleChange:  React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setUnprocessedText(e.target.value)
    }

    const handleProcessTextData: React.MouseEventHandler<HTMLButtonElement> = () => {
        const rows = unProcessedText.trim().split('\n')

        const state: any = {
            byId: {},
            allIds: []
        }
        const regionsState = rows.reduce((acc, row) => {
            const [id, value] = row.split('\t')
            acc.byId[id] = {
                id: id.split(' ').join('').toLowerCase(),
                text: id,
                value
            }
            acc.allIds.push(id)
            return acc
        }, state) as T_RegionsState
           
        // const regionsState = processedValues.reduce((acc, value, index, arr) => {
        //     if(!isOdd(index)) {
        //         let id: T_RegionOptions['id'] = 'aragatsotn'
        //         for(let key in REGIONS_LOCALIZE_OPTIONS.en) {
        //             console.log(REGIONS_LOCALIZE_OPTIONS.en[key as T_RegionOptions['id']], value);
                    
        //             if(REGIONS_LOCALIZE_OPTIONS.en[key as T_RegionOptions['id']] === value) {
        //                 id = key as T_RegionOptions['id']
        //             }
        //         }
                
        //         if(!acc.byId[id]) acc.byId[id] = {}
        //         acc.byId[id] = {
        //             id,
        //             text: value,
        //             value: +arr[index + 1]
        //         }
        //         acc.allIds.push(id)
        //     }
        //     return acc
        // }, state) as T_RegionsState
console.log({regionsState});

        dispatch(setRegionsData(regionsState))
        setIsProcessedTable(true)

        // const { min, max } = regionsState.allIds.reduce((acc, id) => {
        //     const { value } = regionsState.byId[id]
        //     if(value < acc.min) {
        //         acc.min = value
        //     } else if(value > acc.max) {
        //         acc.max = value
        //     }
        //     return acc
        // }, {
        //     min: -Infinity,
        //     max: Infinity
        // })

        // let chartLegends: T_ChartState['legend'] = {
        //     byId: {...LEGEND_INITIAL_ROWS},
        //     allIds: [...LEGEND_INITIAL_ROW_IDS]
        // }

        // const range = (max - min) / chartLegends.allIds.length
        // chartLegends.allIds.forEach((id, index) => {
        //     const rangeStart = min + range * index
        //     const rangeEnd = rangeStart + range
        //     chartLegends.byId[id] = {
        //         ...chartLegends.byId[id],
        //         rangeStart,
        //         rangeEnd,
        //         name: rangeStart + ' - ' + rangeEnd
        //     }
        // })

        // dispatch(setChartLegends(chartLegends))
    }
    
    if(!isProcessedTable) return (
        <>
            <TextFormat value={unProcessedText} onChange={handleChange} />
            <div className={styles.inputProcessButtons}>
                <Button className={unProcessedText ? undefined : 'disabled'} onClick={handleProcessTextData}>Process Text</Button>
                <Button onClick={() => setIsProcessedTable(true)}>Skip to Table</Button>
            </div>
        </>
    )

    return (
        <div className={styles.dataTable}>
            <TableContainer component={Paper}>
                <Table aria-label="chart data table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            data.allIds.map((id) => {  
                                const { text, value } = data.byId[id];
                                return (
                                    <TableRow key={id}>
                                        <TableCell>
                                            <input 
                                                name={id}
                                                data-region-option-name='text'
                                                className={styles.text}
                                                value={text} 
                                                onChange={handleTextChange} 
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <input 
                                                type='number' 
                                                data-region-option-name='value'
                                                name={id}
                                                className={styles.value} 
                                                value={value}
                                                onChange={handleTextChange} 
                                            />
                                        </TableCell>
                                </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}