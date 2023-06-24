import { TextareaAutosize } from '@mui/base';
import { Alert, Button, Snackbar } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FC, useState } from 'react';

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

export const DataTable: FC = () => {

    const dispatch = useTypedDispatch()
    const data = useTypedSelector(selectRegionsData)
    const [ isProcessedTable, setIsProcessedTable ] = useState(false)
    const [ unProcessedText, setUnprocessedText ] = useState('');

    const handleTextChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target
        const attrName = e.currentTarget.getAttribute('data-regionoptionname') as keyof T_RegionOptions
        dispatch(setRegionOptions({
            id: name as T_RegionOptions['id'],
            [attrName]: value,
        }))
    }

    const handleChange:  React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setUnprocessedText(e.target.value)
    }

    const handleProcessTextData: React.MouseEventHandler<HTMLButtonElement> = () => {
        const processedValues = unProcessedText.trim().split(/[\t | \n]/).filter(value => value.toLowerCase() !== 'ձոր').map(value => value.toLowerCase() === 'վայոց' ? 'Վայոց ձոր' : value);
        const state: any = {
            byId: {},
            allIds: []
        }
        
        const regionsState = processedValues.reduce((acc, value, index, arr) => {
            if(!isOdd(index)) {
                let id: T_RegionOptions['id'] = 'aragatsotn'
                for(let key in REGIONS_LOCALIZE_OPTIONS.am) {
                    
                    if(REGIONS_LOCALIZE_OPTIONS.am[key as T_RegionOptions['id']] === value) {
                        id = key as T_RegionOptions['id']
                    }
                }
                
                if(!acc.byId[id]) acc.byId[id] = {}
                acc.byId[id] = {
                    id,
                    text: value,
                    value: +arr[index + 1]
                }
                acc.allIds.push(id)
            }
            return acc
        }, state)  as T_RegionsState

        dispatch(setRegionsData(regionsState))
        setIsProcessedTable(true)

        const [ min, max ] = regionsState.allIds.reduce((acc, id) => {
            const { value } = regionsState.byId[id]
            if(value < acc[0]) {
                acc[0] = value
            } else if(value > acc[1]) {
                acc[1] = value
            }
            return acc
        }, [Infinity, -Infinity])

        let chartLegends: T_ChartState['legend'] = {
            byId: {...LEGEND_INITIAL_ROWS},
            allIds: [...LEGEND_INITIAL_ROW_IDS]
        }

        const range = (max - min) / chartLegends.allIds.length
        chartLegends.allIds.forEach((id, index) => {
            const rangeStart = min + range * index
            const rangeEnd = rangeStart + range
            chartLegends.byId[id] = {
                ...chartLegends.byId[id],
                rangeStart,
                rangeEnd,
                name: rangeStart + ' - ' + rangeEnd
            }
        })

        dispatch(setChartLegends(chartLegends))
    }
    
    if(!isProcessedTable) return (
        <>
            {/* <Snackbar
                open={true}
                autoHideDuration={6000}
                // onClose={handleClose}
                // action={action}
            >
                <Alert  severity="error" sx={{ position: 'fixed', top: 10, right: 10 }}>
                    The data format does not correspond to the existing one.
                </Alert>
            </Snackbar> */}
            <TextFormat value={unProcessedText} onChange={handleChange} />
            <Button style={{display: 'block', marginTop: '.5rem'}} disabled={!unProcessedText} onClick={handleProcessTextData}>Process</Button>
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
                                                data-regionoptionname='text'
                                                className={styles.text}
                                                value={text} 
                                                onChange={handleTextChange} 
                                                />
                                        </TableCell>
                                        <TableCell>
                                            <input 
                                                type='number' 
                                                data-regionoptionname='value'
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