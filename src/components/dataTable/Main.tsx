import { TextareaAutosize } from '@mui/base';
import { Button } from '@mui/material';
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
        }, state)

        dispatch(setRegionsData(regionsState as T_RegionsState))
        setIsProcessedTable(true)
    }
    
    if(!isProcessedTable) return (
        <>
            <TextFormat value={unProcessedText} onChange={handleChange} />
            <Button style={{display: 'block'}} onClick={handleProcessTextData}>Process</Button>
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