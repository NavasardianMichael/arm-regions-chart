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

import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { selectRegionsData } from '../../store/regions/selectors';
import { setRegionOptions, setRegionsData } from '../../store/regions/slice';
import { T_RegionOptions } from '../../store/regions/types';
import styles from './styles.module.css';

export const DataTable: FC = () => {

    const dispatch = useTypedDispatch()
    const data = useTypedSelector(selectRegionsData)
    const [ isProcessedTable, setIsProcessedTable ] = useState(false)
    const [ unProcessedText, setUnprocessedText ] = useState('');

    const handleTextBlur: React.FocusEventHandler<HTMLInputElement> = (e) => {
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
        const processedValues = unProcessedText.trim().split(/[\t | \n]/);

        // const regionsState = processedValues.reduce((acc, value) => {

        // }, [])

        // dispatch(setRegionsData({
        //     byId:
        // }))
        setIsProcessedTable(true);
    }
    
    if(!isProcessedTable) return (
        <>
            <TextareaAutosize 
                onChange={handleChange} 
                aria-label="empty textarea" 
                placeholder="Empty" 
            />
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
                                                defaultValue={text} 
                                                onBlur={handleTextBlur} 
                                                />
                                        </TableCell>
                                        <TableCell>
                                            <input 
                                                type='number' 
                                                data-regionoptionname='value'
                                                name={id}
                                                className={styles.value} 
                                                defaultValue={value}
                                                onBlur={handleTextBlur} 
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