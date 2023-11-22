import { FC, useCallback, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTypedDispatch } from 'hooks/useTypedDispatch';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { selectRegionsData } from 'store/regions/selectors';
import { T_RegionOptions, T_RegionsState } from 'store/regions/types';
import { setRegionOptions, setRegionsData } from 'store/regions/slice';
import { TextFormat } from './TextFormat';
import { Button } from 'components/_shared/button/Main';
import { Snackbar } from '@mui/base';
import styles from './styles.module.css';

export const DataTable: FC = () => {

    const dispatch = useTypedDispatch()
    const data = useTypedSelector(selectRegionsData)
    const [ isProcessedTable, setIsProcessedTable ] = useState(false)
    const [ hasError, setHasError ] = useState(false)
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

    const handleCloseError = useCallback(() => {
        setHasError(false)
    }, [])

    const handleProcessTextData: React.MouseEventHandler<HTMLButtonElement> = () => {
        try {
            const rows = unProcessedText.trim().split('\n').filter(row => !!row)

            const state: any = {
                byId: {},
                allIds: []
            }
            const regionsState = rows.reduce((acc, row) => {
                const [text, value] = row.split('\t')
                if(!text && !value || isNaN(+value)) {console.log({text, value, row});
                return acc}
                const id = text.split(' ').join('').toLowerCase()
                acc.byId[id] = {
                    id,
                    text,
                    value: +value
                }
                acc.allIds.push(id)
                return acc
            }, state) as T_RegionsState

            dispatch(setRegionsData(regionsState))
            setIsProcessedTable(true)
        } catch {
            setHasError(true)
        }
    }
    
    if(!isProcessedTable) return (
        <>
            <TextFormat value={unProcessedText} onChange={handleChange} />
            <div className={styles.inputProcessButtons}>
                <Button className={unProcessedText ? undefined : 'disabled'} onClick={handleProcessTextData}>Process Tab Delimited Text</Button>
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
            <Snackbar open={!hasError} onClose={handleCloseError}>
             <div className="snackbar-message">
                <p className="snackbar-title">Notifications sent</p>
                <p className="snackbar-description">
                  Everything was sent to the desired address.
                </p>
              </div>
            </Snackbar>            
        </div>
    )
}